const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const path = require('path');
const serverDir = path.resolve(__dirname, '../server');
const mongoose = require(path.join(serverDir, 'node_modules/mongoose'));
const env = require(path.join(serverDir, 'src/config/env'));
const rzp = require(path.join(serverDir, 'src/config/razorpay'));
const User = require(path.join(serverDir, 'src/models/User'));
const Product = require(path.join(serverDir, 'src/models/Product'));
const Payment = require(path.join(serverDir, 'src/models/Payment'));
const pay = require(path.join(serverDir, 'src/services/payment.service'));

async function runPaymentTests() {
  console.log('\n========================================');
  console.log('💳 RUNNING PAYMENT GATEWAY & ORDER TESTS');
  console.log('========================================');

  await mongoose.connect(env.mongoUri);
  let testUser = null;
  const createdOrderIds = [];

  try {
    // 1. Products Verification
    console.log('\n▶ [1/5] Verifying Active Puja Products & Prices...');
    const products = await Product.find({ isActive: true });
    if (!products || products.length === 0) throw new Error('No active products found in database');
    console.log(`  ✓ Found ${products.length} active products:`);
    products.forEach(p => console.log(`     • [${p.type}] "${p.name}" - ₹${p.price}`));

    // 2. Setup Test User
    const kId = 'KLY_TEST_' + Math.floor(100000 + Math.random() * 900000);
    testUser = await User.create({
      name: 'Anuradha Devi',
      phone: '98888' + Math.floor(10000 + Math.random() * 90000),
      email: `anuradha_${Date.now()}@example.com`,
      kalyanamId: kId,
      paid: false
    });
    console.log(`\n▶ [2/5] Created test devotee for checkout: ${testUser.name} (${testUser.kalyanamId})`);

    // 3. Live Razorpay Order Creation
    console.log('\n▶ [3/5] Testing Live Razorpay Gateway Order Creation...');
    const chosenProduct = products.find(p => p.type === 'video_kit') || products[0];
    const amountInPaise = Math.round(chosenProduct.price * 100);

    const rzpOrder = await rzp.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_test`,
      notes: {
        kalyanamId: testUser.kalyanamId,
        userId: testUser._id.toString(),
        plan: chosenProduct.type,
        productId: chosenProduct._id.toString(),
        productName: chosenProduct.name,
        priceInRupees: chosenProduct.price
      }
    });

    if (!rzpOrder || !rzpOrder.id || !rzpOrder.id.startsWith('order_')) {
      throw new Error('Failed to create Razorpay live order: ' + JSON.stringify(rzpOrder));
    }
    createdOrderIds.push(rzpOrder.id);
    console.log(`  ✓ Razorpay Live Order generated: ${rzpOrder.id} for ₹${chosenProduct.price} (${rzpOrder.amount} paise)`);

    // 4. Mark Devotee Paid and Record in Payment Ledger
    console.log('\n▶ [4/5] Testing Payment Verification & Ledger Record (markPaid)...');
    const mockPaymentId = 'pay_test_' + Date.now();
    await pay.markPaid(testUser, rzpOrder.id, mockPaymentId, chosenProduct.type, chosenProduct.hasVideoAccess, chosenProduct.price);

    const updatedUser = await User.findById(testUser._id);
    if (!updatedUser.paid || updatedUser.orderId !== rzpOrder.id) {
      throw new Error('Devotee paid state was not updated correctly');
    }
    console.log(`  ✓ Devotee marked as Paid: plan=${updatedUser.plan}, hasVideoAccess=${updatedUser.hasVideoAccess}`);

    const ledgerEntry = await Payment.findOne({ orderId: rzpOrder.id });
    if (!ledgerEntry || ledgerEntry.status !== 'captured') {
      throw new Error('Payment ledger record missing or status not captured');
    }
    console.log(`  ✓ Payment ledger updated: orderId=${ledgerEntry.orderId}, status=${ledgerEntry.status}, devotee=${ledgerEntry.userName}`);

    // 5. Simulated Mode Fallback Verification
    console.log('\n▶ [5/5] Testing Simulated Sandbox Order Verification...');
    const simOrderId = 'order_sim_' + Math.random().toString(36).substring(2, 10);
    const simPaymentId = 'pay_sim_' + Math.random().toString(36).substring(2, 10);
    await pay.markPaid(testUser, simOrderId, simPaymentId, 'digital_kit', false, 21);
    createdOrderIds.push(simOrderId);
    console.log(`  ✓ Simulated checkout verified without error: ${simOrderId}`);

    console.log('\n🎉 ALL 5 PAYMENT & GATEWAY TESTS PASSED!');
    return true;
  } finally {
    if (testUser && testUser._id) {
      await User.deleteOne({ _id: testUser._id });
    }
    for (const oid of createdOrderIds) {
      await Payment.deleteMany({ orderId: oid });
    }
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  runPaymentTests()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('\n❌ PAYMENT TEST FAILED:', err);
      process.exit(1);
    });
}

module.exports = runPaymentTests;

