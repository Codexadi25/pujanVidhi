const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const path = require('path');
const serverDir = path.resolve(__dirname, '../server');
const mongoose = require(path.join(serverDir, 'node_modules/mongoose'));
const env = require(path.join(serverDir, 'src/config/env'));
const User = require(path.join(serverDir, 'src/models/User'));
const { signToken, verifyToken } = require(path.join(serverDir, 'src/utils/token'));
const bcrypt = require(path.join(serverDir, 'node_modules/bcryptjs'));

async function runAuthTests() {
  console.log('\n========================================');
  console.log('🧪 RUNNING AUTHENTICATION & DEVOTEE TESTS');
  console.log('========================================');
  
  await mongoose.connect(env.mongoUri);
  const testPhone = '99999' + Math.floor(10000 + Math.random() * 90000);
  const testEmail = `devotee_${Date.now()}@example.com`;
  const testPassword = 'Password@123';
  let createdUser = null;

  try {
    // 1. Devotee Registration
    console.log(`\n▶ [1/6] Testing Devotee Registration (${testPhone}, ${testEmail})...`);
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const kalyanamId = 'KLY' + Math.floor(1000000 + Math.random() * 9000000);
    createdUser = await User.create({
      name: 'Radheshyam Sharma',
      phone: testPhone,
      email: testEmail.toLowerCase(),
      password: hashedPassword,
      kalyanamId,
      paid: false
    });
    if (!createdUser || !createdUser._id) throw new Error('User creation returned empty document');
    console.log(`  ✓ Registered devotee: ${createdUser.name} | Kalyanam ID: ${createdUser.kalyanamId}`);

    // 2. JWT Generation & Verification
    console.log('\n▶ [2/6] Testing JWT Token Signing & Decoding...');
    const token = signToken(createdUser);
    const decoded = verifyToken(token);
    if (decoded.id !== createdUser._id.toString()) throw new Error('Decoded token ID does not match user ID');
    console.log('  ✓ Token signed and verified successfully');

    // 3. User Login via Email
    console.log('\n▶ [3/6] Testing Login via Email...');
    const userByEmail = await User.findOne({ email: testEmail.toLowerCase() });
    const isEmailPassValid = await bcrypt.compare(testPassword, userByEmail.password);
    if (!isEmailPassValid) throw new Error('Password verification failed for email login');
    console.log('  ✓ Devotee authenticated via Email successfully');

    // 4. User Login via Phone
    console.log('\n▶ [4/6] Testing Login via 10-Digit Mobile Number...');
    const userByPhone = await User.findOne({ phone: testPhone });
    const isPhonePassValid = await bcrypt.compare(testPassword, userByPhone.password);
    if (!isPhonePassValid) throw new Error('Password verification failed for phone login');
    console.log('  ✓ Devotee authenticated via Phone successfully');

    // 5. Phone Access ("Already Paid? Access via Phone")
    console.log('\n▶ [5/6] Testing Phone Access Verification Logic...');
    // Unpaid user check
    if (createdUser.paid) throw new Error('Expected new user to be unpaid initially');
    console.log('  ✓ Unpaid devotee correctly recognized as unpaid');

    // Mark paid and re-verify
    createdUser.paid = true;
    createdUser.hasPaid = true;
    createdUser.plan = 'video_kit';
    await createdUser.save();
    const paidCheck = await User.findOne({ phone: testPhone });
    if (!paidCheck.paid) throw new Error('Failed to update devotee paid state');
    console.log('  ✓ Devotee paid access verified via Phone lookup');

    // 6. User Profile Serialization
    console.log('\n▶ [6/6] Testing toPublic() Devotee Profile Serialization...');
    const publicProfile = createdUser.toPublic();
    if (publicProfile.password) throw new Error('CRITICAL: Password exposed in public user profile!');
    if (!publicProfile.kalyanamId || !publicProfile.phone) throw new Error('Essential profile fields missing');
    console.log('  ✓ Devotee profile safely sanitized (password hidden, kalyanamId present)');

    console.log('\n🎉 ALL 6 AUTHENTICATION TESTS PASSED!');
    return true;
  } finally {
    if (createdUser && createdUser._id) {
      await User.deleteOne({ _id: createdUser._id });
      console.log(`  (Cleaned up test devotee: ${createdUser.name})`);
    }
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  runAuthTests()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('\n❌ AUTH TEST FAILED:', err);
      process.exit(1);
    });
}

module.exports = runAuthTests;

