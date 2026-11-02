const runAuthTests = require('./auth.test');
const runPaymentTests = require('./payment.test');
const runContentTests = require('./content.test');
const runAdminTests = require('./admin.test');

async function runAll() {
  const startTime = Date.now();
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║        POOJANVIDHI COMPREHENSIVE INTEGRATION TEST SUITE        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  const results = [];

  // Suite 1: Auth
  try {
    const s1Start = Date.now();
    await runAuthTests();
    results.push({ name: 'Devotee Authentication & Profiles', passed: true, duration: Date.now() - s1Start });
  } catch (err) {
    results.push({ name: 'Devotee Authentication & Profiles', passed: false, error: err.message });
  }

  // Suite 2: Payment & Razorpay
  try {
    const s2Start = Date.now();
    await runPaymentTests();
    results.push({ name: 'Razorpay PG & Payment Ledger', passed: true, duration: Date.now() - s2Start });
  } catch (err) {
    results.push({ name: 'Razorpay PG & Payment Ledger', passed: false, error: err.message });
  }

  // Suite 3: Sacred Content & DRM
  try {
    const s3Start = Date.now();
    await runContentTests();
    results.push({ name: 'Sacred Vidhi Access & PDF CDN', passed: true, duration: Date.now() - s3Start });
  } catch (err) {
    results.push({ name: 'Sacred Vidhi Access & PDF CDN', passed: false, error: err.message });
  }

  // Suite 4: Admin & Lifeline Hub
  try {
    const s4Start = Date.now();
    await runAdminTests();
    results.push({ name: 'Admin Control Center & Lifeline Hub', passed: true, duration: Date.now() - s4Start });
  } catch (err) {
    results.push({ name: 'Admin Control Center & Lifeline Hub', passed: false, error: err.message });
  }

  // Summary Report
  console.log('\n================================================================');
  console.log('📊 FINAL TEST RESULTS SUMMARY REPORT');
  console.log('================================================================');
  let allPassed = true;
  for (const r of results) {
    if (r.passed) {
      console.log(` ✅ PASS : ${r.name} (${r.duration}ms)`);
    } else {
      console.log(` ❌ FAIL : ${r.name} - Error: ${r.error}`);
      allPassed = false;
    }
  }
  console.log('----------------------------------------------------------------');
  console.log(`Total Execution Time: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  console.log(`Status: ${allPassed ? '🌟 ALL TEST SUITES PASSED PERFECTLY' : '⚠️ SOME TESTS FAILED'}`);
  console.log('================================================================\n');

  if (!allPassed) process.exit(1);
}

runAll().catch(err => {
  console.error('Test Suite Runner Error:', err);
  process.exit(1);
});

