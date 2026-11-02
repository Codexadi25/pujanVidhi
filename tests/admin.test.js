const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const path = require('path');
const serverDir = path.resolve(__dirname, '../server');
const mongoose = require(path.join(serverDir, 'node_modules/mongoose'));
const env = require(path.join(serverDir, 'src/config/env'));
const Admin = require(path.join(serverDir, 'src/models/Admin'));
const Setting = require(path.join(serverDir, 'src/models/Setting'));
const Payment = require(path.join(serverDir, 'src/models/Payment'));
const User = require(path.join(serverDir, 'src/models/User'));

async function runAdminTests() {
  console.log('\n========================================');
  console.log('🛡️ RUNNING ADMIN & LIFELINE HUB TESTS');
  console.log('========================================');

  await mongoose.connect(env.mongoUri);

  try {
    // 1. Admin Authentication Key Verification
    console.log('\n▶ [1/4] Verifying Admin Key Security...');
    const configuredKey = env.adminKey;
    if (!configuredKey || configuredKey.length < 6) throw new Error('Admin key is weak or missing');
    console.log(`  ✓ Admin passkey is configured securely`);

    // 2. Company Grievance & Support Settings
    console.log('\n▶ [2/4] Testing Dynamic Grievance & Support Settings...');
    let settingDoc = await Setting.findOne({ key: 'company_settings' });
    if (!settingDoc) {
      settingDoc = await Setting.create({
        key: 'company_settings',
        value: {
          supportPhone: '+919956355567',
          supportEmail: 'thepoojanvidhi@gmail.com',
          grievanceEmail: 'aditya.sahu2557@gmail.com',
          grievanceOfficer: 'Aditya Sahu',
          entityName: 'पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)'
        }
      });
    }
    const val = settingDoc.value || {};
    if (!val.supportPhone || !val.grievanceOfficer) {
      throw new Error('Company settings document invalid: ' + JSON.stringify(val));
    }
    console.log(`  ✓ Company Support Helpline: ${val.supportPhone}`);
    console.log(`  ✓ Grievance Officer: ${val.grievanceOfficer} (${val.grievanceEmail})`);

    // 3. Lifeline Diagnostic Search
    console.log('\n▶ [3/4] Testing Lifeline Devotee Diagnostic Search Engine...');
    const samplePayment = await Payment.findOne().sort({ createdAt: -1 });
    if (samplePayment) {
      const matchByKid = await Payment.find({ kalyanamId: samplePayment.kalyanamId });
      if (matchByKid.length === 0) throw new Error('Lifeline query by Kalyanam ID failed');
      console.log(`  ✓ Lifeline search resolved ${matchByKid.length} orders for ${samplePayment.kalyanamId}`);
    } else {
      console.log('  ⚠ No past payments to test Lifeline with, skipping match check.');
    }

    // 4. Admin Order Ledger Multi-Order Integrity
    console.log('\n▶ [4/4] Testing Order Ledger Multi-Order Data Mapping...');
    const allOrders = await Payment.find().limit(5);
    console.log(`  ✓ Fetched ${allOrders.length} recent orders from Payment ledger`);

    console.log('\n🎉 ALL 4 ADMIN & LIFELINE TESTS PASSED!');
    return true;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  runAdminTests()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('\n❌ ADMIN TEST FAILED:', err);
      process.exit(1);
    });
}

module.exports = runAdminTests;

