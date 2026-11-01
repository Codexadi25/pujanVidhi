import React from 'react';
import {
  ShieldCheck, ArrowLeft, Mail, Phone, Lock, FileText,
  UserCheck, AlertCircle, HeartHandshake, Sparkles, Clock, Languages
} from 'lucide-react';

export default function PrivacyPolicy({ onBackToHome, settings, lang = 'hi', setLang }) {
  const isHindi = lang === 'hi';
  const supportEmail = settings?.supportEmail || 'thepoojanvidhi@gmail.com';
  const supportPhone = settings?.supportPhone || '+919956355567';
  const grievanceEmail = settings?.grievanceEmail || 'aditya.sahu2557@gmail.com';
  const grievanceOfficer = settings?.grievanceOfficer || 'Aditya Sahu';
  const entityName = settings?.entityName || 'पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)';

  return (
    <div className={`privacy-page-root ${isHindi ? 'hindi' : ''}`} style={{
      minHeight: '100vh',
      backgroundColor: '#fbf7f0',
      color: '#38231b',
      fontFamily: isHindi ? '"Noto Sans Devanagari", sans-serif' : '"Lato", -apple-system, sans-serif'
    }}>
      {/* Top Banner Navigation */}
      <header style={{
        backgroundColor: '#fff9f2',
        borderBottom: '1px solid #ebd9c8',
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#8f211c',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} /> {isHindi ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/images/PoojanVidhi_Logo.jpeg" alt="PoojanVidhi" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #c69a43' }} />
            <span style={{
              fontFamily: '"Noto Serif Devanagari", serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#8f211c'
            }}>
              पूजनविधि
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setLang && setLang(isHindi ? 'en' : 'hi')}
              style={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(143, 33, 28, 0.08)',
                border: '1.5px solid rgba(143, 33, 28, 0.3)',
                color: '#8f211c',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700
              }}
            >
              <Languages size={15}/>
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#2e7d32',
              fontWeight: 700,
              background: '#e8f5e9',
              padding: '4px 10px',
              borderRadius: '20px'
            }}>
              <ShieldCheck size={14} /> {isHindi ? '256-बिट SSL सुरक्षित' : '256-Bit SSL Protected'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px 80px' }}>
        {/* Hero Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #ebd9c8',
          padding: '36px 32px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(143, 33, 28, 0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#c69a43',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            <Sparkles size={16} /> {isHindi ? 'पावन दीवाली परंपरा एवं विश्वास' : 'Auspicious Diwali Traditions & Sacred Trust'}
          </div>

          <h1 style={{
            fontSize: '32px',
            color: '#4b1716',
            margin: '8px 0 16px',
            fontFamily: '"Noto Serif Devanagari", serif',
            fontWeight: 700
          }}>
            {isHindi ? 'गोपनीयता, डेटा सुरक्षा एवं सेवा शर्तें' : 'Privacy Policy, Data Protection & Terms'}
          </h1>

          <p style={{
            color: '#6e5447',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            {isHindi
              ? `${entityName} पर हम आपके व्यक्तिगत विवरण व विश्वास की सर्वोच्च मर्यादा बनाए रखते हैं। आपकी जानकारी का उपयोग केवल पूजन सामग्री व पावन एक्सेस प्रदान करने हेतु किया जाता है।`
              : `At ${entityName}, we hold your devotional trust and privacy in the highest sacred regard. We handle your details strictly to deliver authentic Diwali Lakshmi-Ganesh Pooja guidance.`}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
            flexWrap: 'wrap',
            fontSize: '13px',
            color: '#8f211c',
            fontWeight: 700
          }}>
            <span>🛡️ {isHindi ? '१००% शून्य विज्ञापन नीति' : '100% Zero-Ad Policy'}</span>
            <span>🔒 {isHindi ? 'कभी भी तीसरे पक्ष को डेटा विक्रय नहीं' : 'Never Sold to Third Parties'}</span>
            <span>⚡ {isHindi ? 'रेज़रपे द्वारा सुरक्षित भुगतान' : 'Razorpay Encrypted Payments'}</span>
          </div>
        </div>

        {/* Section 1 */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ebd9c8', padding: '28px 24px', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '20px', color: '#4b1716', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HeartHandshake size={20} color="#8f211c" />
            {isHindi ? '1. परिचय एवं संस्था का संकल्प' : '1. Introduction & Our Sacred Commitment'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#553d32', margin: 0 }}>
            {isHindi
              ? `यह गोपनीयता नीति एवं नियम ${entityName} (वेबसाइट: https://poojanvidhi.web.app) के लिए लागू हैं। हमारा उद्देश्य प्रत्येक हिंदू परिवार को संपूर्ण श्रद्धा, प्रामाणिक वैदिक परंपरा और पूर्ण विधि-विधान के साथ दीपावली पूजन संपन्न कराना है। हम भारतीय सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के अनुरूप पूर्ण पारदर्शिता के साथ कार्य करते हैं।`
              : `This Privacy Policy governs ${entityName} (Platform: https://poojanvidhi.web.app). Our mission is to empower families worldwide to perform Diwali Lakshmi-Ganesh Pooja with confidence, pristine Vedic procedures, and complete peace of mind. We maintain transparency under the Indian Information Technology Rules, 2021.`}
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ebd9c8', padding: '28px 24px', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '20px', color: '#4b1716', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#8f211c" />
            {isHindi ? '2. एकत्र की जाने वाली जानकारी' : '2. Information We Collect'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#553d32', margin: '0 0 12px' }}>
            {isHindi
              ? 'डिजिटल किट सक्रिय करने तथा भक्त का व्यक्तिगत कल्याणम आईडी (Kalyanam ID) उत्पन्न करने हेतु हम केवल न्यूनतम आवश्यक जानकारी लेते हैं:'
              : 'To activate your perpetual digital kit access and assign a unique Kalyanam Member ID, we collect only minimal necessary information:'}
          </p>
          <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', lineHeight: 1.8, color: '#553d32' }}>
            <li><strong>{isHindi ? 'पूरा नाम:' : 'Full Name:'}</strong> {isHindi ? 'दस्तावेज़ पर व्यक्तिगत वाटरमार्क व परिवार के संकल्प हेतु।' : 'To personalize your sacred guide and generate your unique devotee identity watermark.'}</li>
            <li><strong>{isHindi ? 'ईमेल पता:' : 'Email Address:'}</strong> {isHindi ? 'डिजिटल रसीद, लॉगिन क्रेडेंशियल व सहायता हेतु।' : 'To deliver payment confirmation, login credentials, and priority support.'}</li>
            <li><strong>{isHindi ? '10-अंकों का मोबाइल नंबर:' : '10-Digit Mobile Number:'}</strong> {isHindi ? 'मोबाइल-आधारित त्वरित लॉगिन व व्हाट्सएप सहायता हेतु।' : 'To enable passwordless mobile-based instant access and WhatsApp order assistance.'}</li>
            <li><strong>{isHindi ? 'लेन-देन विवरण:' : 'Transaction Reference:'}</strong> {isHindi ? 'रेज़रपे ऑर्डर आईडी व पेमेंट आईडी (हम कभी कार्ड या यूपीआई पिन स्टोर नहीं करते)।' : 'Razorpay Order ID & Payment ID (we never store card numbers or UPI PINs).'}</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ebd9c8', padding: '28px 24px', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '20px', color: '#4b1716', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={20} color="#8f211c" />
            {isHindi ? '3. भुगतान प्रसंस्करण एवं रेज़रपे सुरक्षा' : '3. Payment Processing & Razorpay Security'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#553d32', margin: 0 }}>
            {isHindi
              ? 'सभी वित्तीय भुगतान भारतीय रिज़र्व बैंक (RBI) द्वारा अधिकृत पेमेंट एग्रीगेटर Razorpay द्वारा 256-बिट SSL एन्क्रिप्शन के माध्यम से संसाधित किए जाते हैं। हम कोई भी बैंकिंग पासवर्ड, कार्ड सीवीवी या यूपीआई पिन अपने सर्वर पर न तो मांगते हैं और न ही स्टोर करते हैं।'
              : 'All financial transactions are processed securely via RBI-authorized payment aggregator Razorpay with 256-bit SSL encryption. We never store or handle debit/credit card CVVs, net banking passwords, or UPI PINs.'}
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ebd9c8', padding: '28px 24px', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '20px', color: '#4b1716', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} color="#8f211c" />
            {isHindi ? '4. डिजिटल डिलीवरी एवं धनवापसी (रिफंड) नीति' : '4. Digital Delivery & Refund Policy'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#553d32', margin: '0 0 12px' }}>
            {isHindi
              ? 'भुगतान सफल होते ही डिजिटल पूजन विधि किट तुरंत आपके खाते में सक्रिय हो जाती है। यदि बैंक नेटवर्क या गेटवे टाइमआउट के कारण भुगतान कट जाने के बाद भी एक्सेस सक्रिय न हो, तो हमारा सिस्टम स्वतः समाधान प्रदान करता है:'
              : 'Upon successful payment, your digital Puja guide and video access are unlocked immediately. In case of payment gateway network drops or debits without instant access:'}
          </p>
          <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', lineHeight: 1.8, color: '#553d32' }}>
            <li>{isHindi ? 'हमारे समर्पित लाइफलाइन इंजन द्वारा स्वतः 10 मिनट के भीतर सत्यापन।' : 'Automatic PG telemetry reconciliation via our Lifeline Engine within 10 minutes.'}</li>
            <li>{isHindi ? 'व्हाट्सएप या ईमेल पर सूचित करने पर 2 घंटे के भीतर मैन्युअल एक्सेस सक्रियण।' : 'Instant manual entitlement unlock upon WhatsApp verification within 2 hours.'}</li>
            <li>{isHindi ? 'दोहरा भुगतान (डुप्लीकेट चार्ज) होने पर 100% राशि स्वतः मूल भुगतान खाते में 3-5 कार्यदिवसों में वापस।' : 'Duplicate charges or non-delivered entitlements are refunded 100% to the original source within 3-5 bank business days.'}</li>
          </ul>
        </section>

        {/* Section 5: Grievance Contacts */}
        <section style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '2px solid #d9b86c',
          padding: '30px 26px',
          marginBottom: '20px',
          boxShadow: '0 6px 24px rgba(198, 154, 67, 0.1)'
        }}>
          <h2 style={{ fontSize: '22px', color: '#4b1716', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🏛️</span> {isHindi ? '5. वैधानिक शिकायत अधिकारी एवं संपर्क विवरण' : '5. Statutory Grievance Officer & Direct Contacts'}
          </h2>
          <p style={{ fontSize: '14px', color: '#6d5447', margin: '0 0 20px', lineHeight: 1.7 }}>
            {isHindi
              ? 'सूचना प्रौद्योगिकी नियम, 2021 के अनुपालन में, किसी भी प्रश्न, डेटा सुधार अथवा भुगतान विवाद हेतु हमारे अधिकृत शिकायत अधिकारी से संपर्क करें:'
              : 'Pursuant to the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, you may contact our statutory Grievance Officer:'}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ background: '#fffaf2', border: '1px solid #eedbc5', borderRadius: '10px', padding: '16px' }}>
              <small style={{ color: '#8f211c', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                {isHindi ? 'अधिकारी एवं संस्था' : 'Officer & Entity'}
              </small>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#38231b' }}>{grievanceOfficer}</div>
              <div style={{ fontSize: '13px', color: '#6d5447', marginTop: '2px' }}>{entityName}</div>
            </div>

            <div style={{ background: '#fffaf2', border: '1px solid #eedbc5', borderRadius: '10px', padding: '16px' }}>
              <small style={{ color: '#8f211c', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                {isHindi ? 'आधिकारिक शिकायत ईमेल' : 'Official Grievance Email'}
              </small>
              <a href={`mailto:${grievanceEmail}`} style={{ fontWeight: 700, fontSize: '15px', color: '#8f211c', textDecoration: 'underline' }}>
                {grievanceEmail}
              </a>
              <div style={{ fontSize: '12px', color: '#6d5447', marginTop: '2px' }}>{isHindi ? '२४ घंटे के भीतर पावती सुनिश्चित' : 'Acknowledgment within 24 hours'}</div>
            </div>

            <div style={{ background: '#fffaf2', border: '1px solid #eedbc5', borderRadius: '10px', padding: '16px' }}>
              <small style={{ color: '#8f211c', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                {isHindi ? 'ग्राहक सेवा व व्हाट्सएप हेल्पलाइन' : 'Customer Support & WhatsApp'}
              </small>
              <a href={`tel:${supportPhone.replace(/\s+/g, '')}`} style={{ fontWeight: 700, fontSize: '15px', color: '#2e7d32', textDecoration: 'none' }}>
                {supportPhone}
              </a>
              <div style={{ fontSize: '12px', color: '#6d5447', marginTop: '2px' }}>{supportEmail}</div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#8c7062' }}>
          {isHindi
            ? 'अंतिम अद्यतन: दीवाली 2026 • सूचना प्रौद्योगिकी अधिनियम, 2000 व नियम 2021 के अंतर्गत प्राधिकृत'
            : 'Last Updated: Diwali 2026 • Fully compliant with Information Technology Act, 2000 & 2021 Rules'}
        </div>
      </main>
    </div>
  );
}
