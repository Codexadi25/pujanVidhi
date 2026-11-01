import React, { useState, useEffect } from 'react';
import {
  Sparkles, Check, ArrowRight, ShieldCheck, Lock, User, Mail, Phone, KeyRound,
  CreditCard, Video, BookOpen, AlertCircle, RefreshCw, LogOut, CheckCircle2,
  ChevronRight, ArrowLeft, Languages
} from 'lucide-react';
import { api, authStorage } from '../services/api';
import { trackEvent } from '../utils/analytics';
import ProtectedVidhiViewer from './ProtectedVidhiViewer';

const buyI18n = {
  hi: {
    backToHome: 'मुख्य पृष्ठ पर लौटें',
    brandTitle: 'पूजनविधि',
    brandSubtitle: 'पूजन किट स्टोर',
    sslSecure: '256-बिट SSL सुरक्षित',
    eyebrow: 'दिवाली 2026 पावन पूजन किट',
    title: 'अपना मार्गदर्शित पूजन अनुभव चुनें',
    subtitle: 'पूर्ण आत्मविश्वास, शुद्ध वैदिक विधि और आत्मिक शांति के साथ अपनी दिवाली लक्ष्मी-गणेश पूजा संपन्न करें।',
    stepSelect: 'किट चयन',
    stepAccount: 'खाता विवरण',
    stepPayment: 'सुरक्षित भुगतान',
    stepAccess: 'ऑनलाइन विधि',
    selectedPlan: 'चयनित प्लान:',
    proceedToAccount: 'खाता विवरण दर्ज करें',
    proceedToPayment: 'भुगतान के लिए आगे बढ़ें',
    changeKit: 'किट बदलें',
    backToAccount: 'विवरण बदलें',
    tabSignup: 'त्वरित भक्त चेकआउट',
    tabPhone: 'पहले से भुगतान किया? फ़ोन से देखें',
    tabLogin: 'पासवर्ड लॉगिन',
    signupLegendTitle: (name) => `${name} के लिए आजीवन एक्सेस सक्रिय करें`,
    signupLegendSub: 'अपना विवरण नीचे दर्ज करें। इसके बाद आपको सुरक्षित भुगतान पर ले जाया जाएगा।',
    fullName: 'पूरा नाम *',
    namePlaceholder: 'उदा. रामेश्वर शर्मा',
    emailAddr: 'ईमेल पता *',
    emailPlaceholder: 'उदा. rameshwar@gmail.com',
    mobileNum: '10-अंकों का मोबाइल नंबर *',
    mobilePlaceholder: 'उदा. 9876543210',
    createPass: 'पासवर्ड बनाएं (वैकल्पिक)',
    createPassPlaceholder: 'वैकल्पिक: मोबाइल एक्सेस हेतु स्वतः सेट हो जाएगा',
    submitSignup: 'खाता बनाएं और भुगतान के लिए आगे बढ़ें',
    privacyNote: '🔒 आपका व्यक्तिगत विवरण पूर्णतः सुरक्षित एवं गोपनीय है।',
    phoneLegendTitle: 'भुगतान कर चुके भक्तों के लिए तुरंत एक्सेस',
    phoneLegendSub: 'खरीद के समय दर्ज किया गया अपना 10-अंकों का मोबाइल नंबर दर्ज करें और तुरंत अपनी पावन पूजन विधि खोलें।',
    submitPhone: 'मेरी पूजन विधि अनलॉक करें',
    whatsappHelp: (num) => `सहायता चाहिए? हमें व्हाट्सएप करें: ${num}`,
    loginLegendTitle: 'स्वागत है! अपने खाते में लॉगिन करें',
    loginLegendSub: 'अपनी खरीदी गई किट देखें या भुगतान पूरा करें।',
    emailOrPhone: 'ईमेल पता या मोबाइल नंबर *',
    loginIdentifierPlaceholder: 'अपना पंजीकृत ईमेल या फ़ोन नंबर दर्ज करें',
    passwordLabel: 'पासवर्ड *',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    submitLogin: 'लॉगिन करें और जारी रखें',
    accountReady: (name) => `खाता तैयार: ${name}`,
    selectedKitLabel: 'चयनित किट:',
    switchAccount: 'अन्य खाता प्रयोग करें',
    orderHeaderTitle: 'अपना ऑर्डर पूरा करें',
    orderHeaderSub: (name, id) => `${name} (${id}) के लिए तुरंत सक्रियण`,
    selectedPackage: 'चयनित पैकेज',
    regularPrice: 'साधारण मूल्य',
    diwaliDiscount: 'दिवाली पावन छूट',
    totalPayable: 'कुल देय राशि:',
    acceptedMethods: 'स्वीकृत भुगतान माध्यम:',
    processingPayment: 'सुरक्षित भुगतान संसाधित हो रहा है...',
    payNow: (amt) => `₹${amt} का सुरक्षित भुगतान करें एवं तुरंत ऑनलाइन विधि पाएं`,
    paymentVerified: 'भुगतान सत्यापित! आपकी पूजन विधि खुल रही है...',
    secureTransaction: '🛡️ 100% सुरक्षित भुगतान',
    instantDelivery: '⚡ तुरंत ऑनलाइन डिलीवरी',
    diwaliSupport: '🕉️ पावन दीवाली सहायता',
    viewKit: 'किट देखें',
    openVidhi: 'पावन विधि खोलें',
    accessActive: (name) => `🙏 ${name} जी के लिए पावन एक्सेस सक्रिय है`,
    lifetimeAccess: (plan) => `आपके पास ${plan} का आजीवन पावन एक्सेस है।`,
    kitSelectedProceed: '✓ चयनित किट • खाता बनाएं',
    selectThisKit: 'यह किट चुनें',
    savePercent: (pct) => `${pct}% की छूट`,
    videoKitName: 'पूजन विधि वीडियो + पूजन किट',
    digitalKitName: 'पूजन विधि किट',
    videoKitSub: 'प्रीमियम मास्टरक्लास: वीडियो वॉकथ्रू + संपूर्ण वैदिक किट',
    digitalKitSub: 'संपूर्ण दिवाली लक्ष्मी-गणेश पूजन डिजिटल मार्गदर्शिका',
    videoBadge: '🌟 सर्वाधिक लोकप्रिय एवं अनुशंसित',
    digitalBadge: 'आवश्यक गाइड',
    videoFeatures: [
      'पूजन विधि किट की सभी सुविधाएं सम्मिलित',
      'पूजा के प्रत्येक चरण का फुल एचडी वीडियो वॉकथ्रू',
      'सटीक संस्कृत मंत्रोच्चार हेतु संपूर्ण ऑडियो गाइड',
      'प्रिंटेबल संपूर्ण पवित्र आरती संग्रह',
      'पारिवारिक संकल्प एवं दीपदान पावन परंपरा निर्देशिका',
      'प्राथमिकता उत्सव मार्गदर्शन एवं असीमित क्लाउड एक्सेस'
    ],
    digitalFeatures: [
      'सम्पूर्ण चरण-दर-चरण दिवाली लक्ष्मी-गणेश पूजा विधि',
      'घरेलू विकल्पों के साथ विस्तृत पूजन सामग्री चेकलिस्ट',
      'सरल हिंदी व अंग्रेजी अर्थ सहित पवित्र संस्कृत मंत्र',
      'चौकी एवं कलश स्थापना का सचित्र आरेख',
      'दिवाली शुभ मुहूर्त एवं स्थिर लग्न मार्गदर्शिका',
      'आपके परिवार के लिए आजीवन डिजिटल एक्सेस'
    ]
  },
  en: {
    backToHome: 'Back to Home',
    brandTitle: 'पूजनविधि',
    brandSubtitle: 'poojanvidhi kit store',
    sslSecure: '256-Bit SSL Secure',
    eyebrow: 'DIWALI 2026 AUSPICIOUS KITS',
    title: 'Choose Your Guided Puja Experience',
    subtitle: 'Perform your Diwali Lakshmi-Ganesh Puja with complete confidence, pristine Vedic procedures, and profound peace of mind.',
    stepSelect: 'Select Kit',
    stepAccount: 'Setup Account',
    stepPayment: 'Payment',
    stepAccess: 'Online Access',
    selectedPlan: 'Selected Plan:',
    proceedToAccount: 'Proceed to Setup Account',
    proceedToPayment: 'Proceed to Payment',
    changeKit: 'Change Kit',
    backToAccount: 'Back to Account Setup',
    tabSignup: 'Instant Devotee Checkout',
    tabPhone: 'Already Paid? Access via Phone',
    tabLogin: 'Password Login',
    signupLegendTitle: (name) => `Sign up to activate perpetual access to ${name}`,
    signupLegendSub: 'Enter your details below. You will be auto-directed to payment next.',
    fullName: 'Full Name *',
    namePlaceholder: 'e.g. Rameshwar Sharma',
    emailAddr: 'Email Address *',
    emailPlaceholder: 'e.g. rameshwar@gmail.com',
    mobileNum: '10-Digit Mobile Number *',
    mobilePlaceholder: 'e.g. 9876543210',
    createPass: 'Create Password (Optional)',
    createPassPlaceholder: 'Optional: Default will be set for mobile access',
    submitSignup: 'Create Account & Proceed to Payment',
    privacyNote: '🔒 Your personal details are strictly private and sacred.',
    phoneLegendTitle: 'Instant Access for Paid Devotees',
    phoneLegendSub: 'Enter your 10-digit mobile number used during purchase to unlock your sacred Puja Vidhi immediately.',
    submitPhone: 'Unlock My Puja Vidhi',
    whatsappHelp: (num) => `Need help? WhatsApp us at ${num}`,
    loginLegendTitle: 'Welcome back! Login to your account',
    loginLegendSub: 'Access your purchased kit or complete payment.',
    emailOrPhone: 'Email Address or Phone *',
    loginIdentifierPlaceholder: 'Enter your registered email or phone',
    passwordLabel: 'Password *',
    passwordPlaceholder: 'Enter your password',
    submitLogin: 'Login & Continue',
    accountReady: (name) => `Account Ready: ${name}`,
    selectedKitLabel: 'Selected Kit:',
    switchAccount: 'Use Different Account',
    orderHeaderTitle: 'Complete Your Order',
    orderHeaderSub: (name, id) => `Instant activation for ${name} (${id})`,
    selectedPackage: 'Selected Package',
    regularPrice: 'Regular Price',
    diwaliDiscount: 'Diwali Festive Discount',
    totalPayable: 'Total Amount Payable:',
    acceptedMethods: 'Accepted Payment Methods:',
    processingPayment: 'Processing Secure Payment...',
    payNow: (amt) => `Pay ₹${amt} & Get Instant Online Access`,
    paymentVerified: 'Payment Verified! Opening Your Kit...',
    secureTransaction: '🛡️ 100% Secure Transaction',
    instantDelivery: '⚡ Instant Online Delivery',
    diwaliSupport: '🕉️ Dedicated Diwali Support',
    viewKit: 'View Kit',
    openVidhi: 'Open Sacred Vidhi',
    accessActive: (name) => `🙏 Auspicious Access Active for ${name}`,
    lifetimeAccess: (plan) => `You have lifetime sacred access to ${plan}.`,
    kitSelectedProceed: '✓ Selected • Proceed to Setup Account',
    selectThisKit: 'Select This Kit',
    savePercent: (pct) => `Save ${pct}%`,
    videoKitName: 'Poojan Vidhi Video + Poojan Kit',
    digitalKitName: 'Poojan Vidhi Kit',
    videoKitSub: 'Premium Masterclass: Video Walkthrough + Sacred Kit',
    digitalKitSub: 'Complete Diwali Lakshmi-Ganesh Puja Digital Guide',
    videoBadge: '🌟 Most Popular & Recommended',
    digitalBadge: 'Essential Guide',
    videoFeatures: [
      'Everything in the Poojan Vidhi Kit',
      'Full HD Step-by-Step Video Walkthrough of Every Puja Stage',
      'Audio Guide for Accurate Sanskrit Mantra Pronunciation',
      'Printable Sacred Aarti Sangrah',
      'Family Sankalp & Deepdaan Sacred Traditions Guide',
      'Priority Festive Guidance & Unlimited Cloud Access'
    ],
    digitalFeatures: [
      'Complete Step-by-Step Diwali Lakshmi-Ganesh Vidhi',
      'Detailed Samagri Checklist with Household Substitutes',
      'Sacred Sanskrit Mantras with Hindi & English Meanings',
      'Chowki & Kalash Sthapana Illustrated Diagram',
      'Diwali Muhurat & Sthir Lagna Guide',
      'Perpetual Digital Access for Your Family'
    ]
  }
};

export default function BuyPage({
  onBackToHome,
  initialKit = 'video_kit',
  initialTab = 'signup',
  settings,
  lang = 'hi',
  setLang
}) {
  const isHindi = lang === 'hi';
  const t = buyI18n[lang] || buyI18n.hi;
  const helpPhone = settings?.supportPhone || '+91 9956355567';
  const [selectedKit, setSelectedKit] = useState(initialKit);
  const [user, setUser] = useState(authStorage.getUser());
  const [authMode, setAuthMode] = useState(initialTab === 'login' ? 'login' : 'signup');
  const [step, setStep] = useState(initialTab === 'login' ? 'account' : 'select');

  useEffect(() => {
    if (initialTab === 'login') {
      setAuthMode('login');
      setStep('account');
    }
  }, [initialTab]);
  
  // Dynamic products from server
  const [dbProducts, setDbProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contentData, setContentData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch dynamic products on mount
  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then(res => {
        if (isMounted && res?.products && Array.isArray(res.products) && res.products.length > 0) {
          setDbProducts(res.products);
        }
      })
      .catch(err => {
        console.warn('Could not fetch products from server, using default active products:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingProducts(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Check login on mount and verify with server
  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      api.getMe()
        .then(res => {
          if (res?.user) {
            setUser(res.user);
          }
        })
        .catch(() => {
          authStorage.clear();
          setUser(null);
        });
    }
  }, []);

  // Compute dynamic kits mapped from server database or fallbacks
  const activeProducts = dbProducts.filter(p => p.isActive);
  const kits = activeProducts.length > 0
    ? activeProducts.map((p) => {
        const isVideo = p.type === 'video_kit' || p.hasVideoAccess;
        const planId = isVideo ? 'video_kit' : 'kit';
        const origPrice = p.origPrice || (p.price > 50 ? p.price * 2 : 199);
        const savingsPercent = origPrice > p.price ? Math.round(((origPrice - p.price) / origPrice) * 100) : 0;
        return {
          id: planId,
          productId: p._id,
          slug: p.slug,
          name: isHindi ? (isVideo ? t.videoKitName : t.digitalKitName) : (p.name || (isVideo ? t.videoKitName : t.digitalKitName)),
          subtitle: isHindi ? (isVideo ? t.videoKitSub : t.digitalKitSub) : (p.subtitle || (isVideo ? t.videoKitSub : t.digitalKitSub)),
          price: p.price,
          origPrice: origPrice,
          savings: savingsPercent > 0 ? t.savePercent(savingsPercent) : '',
          badge: isHindi ? (isVideo ? t.videoBadge : t.digitalBadge) : (p.badge || (isVideo ? t.videoBadge : t.digitalBadge)),
          featured: isVideo,
          hasVideoAccess: p.hasVideoAccess,
          type: p.type,
          features: isHindi ? (isVideo ? t.videoFeatures : t.digitalFeatures) : (p.features && p.features.length > 0 ? p.features : (isVideo ? t.videoFeatures : t.digitalFeatures))
        };
      })
    : [
        {
          id: 'kit',
          productId: null,
          name: t.digitalKitName,
          subtitle: t.digitalKitSub,
          price: 21,
          origPrice: 199,
          savings: t.savePercent(89),
          badge: t.digitalBadge,
          featured: false,
          hasVideoAccess: false,
          features: t.digitalFeatures
        },
        {
          id: 'video_kit',
          productId: null,
          name: t.videoKitName,
          subtitle: t.videoKitSub,
          price: 121,
          origPrice: 499,
          savings: t.savePercent(76),
          badge: t.videoBadge,
          featured: true,
          hasVideoAccess: true,
          features: t.videoFeatures
        }
      ];

  const currentKitInfo = kits.find(k => k.id === selectedKit || k.productId === selectedKit) || kits[1];

  // Helper to load DRM content
  const loadContent = async () => {
    try {
      setLoading(true);
      const res = await api.getContent();
      setContentData(res);
      return res;
    } catch (err) {
      console.warn('Could not load protected content:', err);
      setError(isHindi ? 'पवित्र पूजन सामग्री लोड करने में त्रुटि। कृपया पुनः प्रयास करें।' : 'Could not load protected content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError(isHindi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
    if (!email.trim() || !email.includes('@')) return setError(isHindi ? 'कृपया एक मान्य ईमेल पता दर्ज करें' : 'Please enter a valid email address');
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) return setError(isHindi ? 'कृपया एक मान्य 10-अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');

    try {
      setLoading(true);
      trackEvent('begin_checkout', { item_id: currentKitInfo.id, price: currentKitInfo.price });
      const res = await api.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim().replace(/\D/g, '').slice(-10),
        password: password || 'poojan2026'
      });

      setUser(res.user);
      setStep('payment');
    } catch (err) {
      setError(err.message || (isHindi ? 'पंजीकरण विफल रहा। यदि आप पहले से पंजीकृत हैं, तो कृपया लॉगिन करें।' : 'Registration failed. If you already have an account, please login.'));
    } finally {
      setLoading(false);
    }
  };

  // Handle Phone Access
  const handlePhoneAccess = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      return setError(isHindi ? 'कृपया एक मान्य 10-अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
    }

    try {
      setLoading(true);
      const res = await api.access({ phone: cleanPhone });
      if (res && res.user) {
        setUser(res.user);
        trackEvent('login', { method: 'phone' });
        if (res.user.paid && (res.user.plan === selectedKit || res.user.hasVideoAccess)) {
          setStep('access');
          await loadContent();
        } else {
          setStep('payment');
        }
      } else {
        setError(isHindi ? 'इस मोबाइल नंबर पर कोई खाता नहीं मिला। कृपया विवरण भरकर साइन अप करें।' : 'No account found for this mobile number. Please fill out details to sign up.');
      }
    } catch (err) {
      setError(err.message || (isHindi ? 'मोबाइल नंबर सत्यापित नहीं हो सका। यदि आप नए भक्त हैं, तो कृपया साइन अप करें।' : 'Could not verify mobile number. If you are a new devotee, please sign up.'));
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return setError(isHindi ? 'कृपया अपना ईमेल या मोबाइल नंबर दर्ज करें' : 'Please enter your email or phone number');
    if (!password) return setError(isHindi ? 'कृपया अपना पासवर्ड दर्ज करें' : 'Please enter your password');

    try {
      setLoading(true);
      const res = await api.login({
        email: email.trim().toLowerCase(),
        password
      });

      setUser(res.user);
      trackEvent('login', { method: 'password' });

      if (res.user.paid && (res.user.plan === selectedKit || res.user.hasVideoAccess)) {
        setStep('access');
        await loadContent();
      } else {
        setStep('payment');
      }
    } catch (err) {
      setError(err.message || (isHindi ? 'अमान्य विवरण। कृपया जांचें और पुनः प्रयास करें।' : 'Invalid credentials. Please check and try again.'));
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (currentUser) => {
    setError('');
    const targetUser = currentUser || user;
    if (!targetUser) {
      setError(isHindi ? 'कृपया पहले अपना विवरण दर्ज करें।' : 'Please enter your account details first.');
      setStep('account');
      return;
    }

    try {
      setLoading(true);
      const orderData = await api.createOrder({
        plan: currentKitInfo.id,
        productId: currentKitInfo.productId
      });

      if (!orderData || !orderData.orderId) {
        throw new Error(isHindi ? 'गेटवे से ऑर्डर आईडी प्राप्त नहीं हो सकी।' : 'Failed to receive Order ID from payment gateway.');
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error(isHindi ? 'रेज़रपे भुगतान गेटवे लोड नहीं हो सका। कृपया अपना इंटरनेट कनेक्शन जांचें।' : 'Failed to load Razorpay SDK. Please check your internet connection.');
      }

      if (window.Razorpay && orderData.keyId) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'PoojanVidhi (पूजनविधि)',
          description: currentKitInfo.name,
          image: '/images/PoojanVidhi_Logo.jpeg',
          order_id: orderData.orderId,
          prefill: {
            name: targetUser.name || name,
            email: targetUser.email || email,
            contact: targetUser.phone || phone
          },
          theme: {
            color: '#8f211c'
          },
          handler: async function (response) {
            try {
              setLoading(true);
              const verifyRes = await api.verifyPayment({
                orderId: orderData.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                plan: currentKitInfo.id,
                productId: currentKitInfo.productId
              });

              trackEvent('purchase', {
                transaction_id: response.razorpay_payment_id || orderData.orderId,
                value: currentKitInfo.price,
                currency: 'INR',
                items: [{ item_id: currentKitInfo.id, item_name: currentKitInfo.name, price: currentKitInfo.price }]
              });
              setUser(verifyRes.user);
              setPaymentSuccess(true);

              setTimeout(async () => {
                setStep('access');
                await loadContent();
                setPaymentSuccess(false);
              }, 1000);
            } catch (err) {
              setError(err.message || (isHindi ? 'भुगतान सत्यापन विफल रहा। कृपया सहायता से संपर्क करें।' : 'Payment verification failed. Please contact support.'));
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setError(resp.error?.description || (isHindi ? 'भुगतान असफल रहा। कृपया पुनः प्रयास करें।' : 'Payment was unsuccessful. Please try again.'));
          setLoading(false);
        });
        rzp.open();
        return;
      }

      // Fallback for simulated development mode
      const verifyRes = await api.verifyPayment({
        orderId: orderData.orderId,
        paymentId: 'pay_' + Math.random().toString(36).substring(2, 10),
        signature: 'simulated_sig',
        plan: currentKitInfo.id,
        productId: currentKitInfo.productId
      });

      trackEvent('purchase', {
        transaction_id: orderData.orderId,
        value: currentKitInfo.price,
        currency: 'INR',
        items: [{ item_id: currentKitInfo.id, item_name: currentKitInfo.name, price: currentKitInfo.price }]
      });

      setUser(verifyRes.user);
      setPaymentSuccess(true);

      setTimeout(async () => {
        setStep('access');
        await loadContent();
        setPaymentSuccess(false);
      }, 1000);

    } catch (err) {
      setError(err.message || (isHindi ? 'भुगतान प्रक्रिया में त्रुटि आई। कृपया पुनः प्रयास करें।' : 'Payment processing encountered an error. Please try again.'));
      setLoading(false);
    }
  };

  const handlePayment = () => initiatePayment(user);

  const handleLogout = () => {
    api.logout();
    authStorage.clear();
    setUser(null);
    setContentData(null);
    setStep('select');
  };

  // If user explicitly opened protected content
  if (step === 'access' && user && (user.paid || contentData)) {
    return (
      <ProtectedVidhiViewer
        user={user}
        contentData={contentData}
        onBack={() => setStep('select')}
        onRefresh={loadContent}
        onLogout={handleLogout}
        lang={lang}
      />
    );
  }

  return (
    <div className={`buy-page-root ${isHindi ? 'hindi' : ''}`}>
      {/* Top Banner Navigation */}
      <header className="buy-header">
        <div className="buy-header-inner">
          <button className="buy-back-link" onClick={onBackToHome}>
            <ArrowLeft size={16} /> {t.backToHome}
          </button>
          
          <div className="buy-brand">
            <img src="/images/PoojanVidhi_Logo.jpeg" alt="PoojanVidhi" className="brand-logo-img buy-brand-logo" />
            <span><strong>{t.brandTitle}</strong><small>{t.brandSubtitle}</small></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="language-switch"
              onClick={() => setLang && setLang(isHindi ? 'en' : 'hi')}
              aria-label="Switch language"
              title="Switch Language / भाषा बदलें"
              style={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(143, 33, 28, 0.08)',
                border: '1.5px solid rgba(143, 33, 28, 0.3)',
                color: 'var(--red, #8f211c)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              <Languages size={15}/>
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>

            <div className="buy-header-user">
              {user ? (
                <div className="user-logged-pill">
                  <span className="user-name">🙏 {user.name}</span>
                  {user.paid && (
                    <button className="btn-access-tag" onClick={() => { setStep('access'); loadContent(); }}>
                      {t.viewKit}
                    </button>
                  )}
                  <button className="btn-logout" onClick={handleLogout} title="Logout">
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <span className="secure-badge">
                  <ShieldCheck size={16} /> {t.sslSecure}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper with 4 Distinct Steps */}
      <div className="stepper-bar">
        <div 
          className={`step-item ${step === 'select' ? 'active' : 'completed'}`}
          onClick={() => step !== 'select' && setStep('select')}
          style={{ cursor: step !== 'select' ? 'pointer' : 'default' }}
        >
          <span className="step-num">{step !== 'select' ? '✓' : '1'}</span>
          <span className="step-label">{t.stepSelect}</span>
        </div>
        <div className="step-line" />
        <div 
          className={`step-item ${step === 'account' ? 'active' : (step === 'payment' || user?.paid) ? 'completed' : ''}`}
          onClick={() => (step === 'payment' && !user?.paid) && setStep('account')}
          style={{ cursor: step === 'payment' ? 'pointer' : 'default' }}
        >
          <span className="step-num">{step === 'payment' || user?.paid ? '✓' : '2'}</span>
          <span className="step-label">{t.stepAccount}</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step === 'payment' ? 'active' : user?.paid ? 'completed' : ''}`}>
          <span className="step-num">{user?.paid ? '✓' : '3'}</span>
          <span className="step-label">{t.stepPayment}</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step === 'access' ? 'active' : ''}`}>
          <span className="step-num">4</span>
          <span className="step-label">{t.stepAccess}</span>
        </div>
      </div>

      <div className="buy-content-wrapper">
        {/* If user is logged in and already paid, show friendly banner */}
        {user?.paid && (
          <div style={{
            background: 'linear-gradient(135deg, #fef4e8, #fdf0db)',
            border: '2px solid #c69a43',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(143, 33, 28, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle2 size={32} color="#8f211c" />
              <div>
                <strong style={{ color: '#8f211c', fontSize: '16px', display: 'block' }}>
                  {t.accessActive(user.name)}
                </strong>
                <span style={{ fontSize: '13px', color: '#6d5345' }}>
                  {t.lifetimeAccess(user.plan === 'video_kit' ? t.videoKitName : t.digitalKitName)}
                </span>
              </div>
            </div>
            <button
              onClick={() => { setStep('access'); loadContent(); }}
              style={{
                background: '#8f211c',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <BookOpen size={16} /> {t.openVidhi} ➔
            </button>
          </div>
        )}

        {error && (
          <div className="buy-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SELECT KIT */}
        {step === 'select' && (
          <div className="step-container step-select-view">
            <div className="buy-intro-text">
              <span className="section-kicker"><Sparkles size={14} /> {t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>

            <div className="kits-grid-container">
              {kits.map((kit) => {
                const isSelected = selectedKit === kit.id || selectedKit === kit.productId;
                return (
                  <div
                    key={kit.productId || kit.id}
                    className={`kit-card ${kit.featured ? 'featured' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedKit(kit.id)}
                  >
                    {kit.badge && <span className="kit-badge">{kit.badge}</span>}
                    <div className="kit-header">
                      <h3>{kit.name}</h3>
                      <p>{kit.subtitle}</p>
                    </div>

                    <div className="kit-pricing">
                      <span className="currency">₹</span>
                      <span className="amount">{kit.price}</span>
                      {kit.origPrice > kit.price && (
                        <span className="original">₹{kit.origPrice}</span>
                      )}
                      {kit.savings && (
                        <span className="savings">{kit.savings}</span>
                      )}
                    </div>

                    <ul className="kit-features-list">
                      {kit.features.map((feat, i) => (
                        <li key={i}>
                          <Check size={16} className="feat-check" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`kit-select-btn ${isSelected ? 'btn-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedKit(kit.id);
                        trackEvent('select_item', { item_id: kit.id, item_name: kit.name, price: kit.price });
                        trackEvent('begin_checkout', { item_id: kit.id, price: kit.price });
                        setStep(user ? 'payment' : 'account');
                      }}
                    >
                      {isSelected ? t.kitSelectedProceed : t.selectThisKit}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="kit-selection-action-bar">
              <div className="selected-kit-summary-pill">
                <Sparkles size={16} className="gold-text" />
                <span>{t.selectedPlan} <strong>{currentKitInfo.name}</strong> • <strong>₹{currentKitInfo.price}</strong></span>
              </div>
              <button
                type="button"
                className="btn-proceed-to-account"
                onClick={() => {
                  trackEvent('begin_checkout', { item_id: currentKitInfo.id, price: currentKitInfo.price });
                  setStep(user ? 'payment' : 'account');
                }}
              >
                {user ? t.proceedToPayment : t.proceedToAccount} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SETUP ACCOUNT */}
        {step === 'account' && (
          <div className="step-container step-account-view">
            <div className="step-nav-bar">
              <button className="btn-step-back" onClick={() => setStep('select')}>
                <ArrowLeft size={16} /> {t.changeKit}
              </button>
              <div className="step-context-pill">
                <span>{t.selectedKitLabel} <strong>{currentKitInfo.name}</strong> (₹{currentKitInfo.price})</span>
              </div>
            </div>

            <div className="checkout-section-container">
              {!user ? (
                /* Devotee NOT logged in: Show Signup / Access / Login Form */
                <div className="auth-card">
                  <div className="auth-tabs">
                    <button
                      className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('signup'); setError(''); }}
                    >
                      <User size={16} /> {t.tabSignup}
                    </button>
                    <button
                      className={`auth-tab ${authMode === 'phone' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('phone'); setError(''); }}
                    >
                      <Phone size={16} /> {t.tabPhone}
                    </button>
                    <button
                      className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('login'); setError(''); }}
                    >
                      <Lock size={16} /> {t.tabLogin}
                    </button>
                  </div>

                  {authMode === 'signup' ? (
                    <form className="auth-form" onSubmit={handleSignup}>
                      <div className="form-legend">
                        <h4>{t.signupLegendTitle(currentKitInfo.name)}</h4>
                        <p>{t.signupLegendSub}</p>
                      </div>

                      <div className="input-group">
                        <label>{t.fullName}</label>
                        <div className="input-wrapper">
                          <User size={16} className="input-icon" />
                          <input
                            type="text"
                            placeholder={t.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label>{t.emailAddr}</label>
                        <div className="input-wrapper">
                          <Mail size={16} className="input-icon" />
                          <input
                            type="email"
                            placeholder={t.emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label>{t.mobileNum}</label>
                        <div className="input-wrapper">
                          <Phone size={16} className="input-icon" />
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder={t.mobilePlaceholder}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label>{t.createPass}</label>
                        <div className="input-wrapper">
                          <KeyRound size={16} className="input-icon" />
                          <input
                            type="password"
                            placeholder={t.createPassPlaceholder}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <button className="auth-submit-btn" type="submit" disabled={loading}>
                        {loading ? <RefreshCw className="spin" size={18} /> : (
                          <>{t.submitSignup} <ArrowRight size={18} /></>
                        )}
                      </button>
                      <small className="form-privacy-note">{t.privacyNote}</small>
                    </form>
                  ) : authMode === 'phone' ? (
                    <form className="auth-form" onSubmit={handlePhoneAccess}>
                      <div className="form-legend">
                        <h4>{t.phoneLegendTitle}</h4>
                        <p>{t.phoneLegendSub}</p>
                      </div>

                      <div className="input-group">
                        <label>{t.mobileNum}</label>
                        <div className="input-wrapper">
                          <Phone size={16} className="input-icon" />
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder={t.mobilePlaceholder}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                      </div>

                      <button className="auth-submit-btn" type="submit" disabled={loading}>
                        {loading ? <RefreshCw className="spin" size={18} /> : (
                          <>{t.submitPhone} <ArrowRight size={18} /></>
                        )}
                      </button>
                      <small className="form-privacy-note">{t.whatsappHelp(helpPhone)}</small>
                    </form>
                  ) : (
                    <form className="auth-form" onSubmit={handleLogin}>
                      <div className="form-legend">
                        <h4>{t.loginLegendTitle}</h4>
                        <p>{t.loginLegendSub}</p>
                      </div>

                      <div className="input-group">
                        <label>{t.emailOrPhone}</label>
                        <div className="input-wrapper">
                          <Mail size={16} className="input-icon" />
                          <input
                            type="text"
                            placeholder={t.loginIdentifierPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label>{t.passwordLabel}</label>
                        <div className="input-wrapper">
                          <KeyRound size={16} className="input-icon" />
                          <input
                            type="password"
                            placeholder={t.passwordPlaceholder}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <button className="auth-submit-btn" type="submit" disabled={loading}>
                        {loading ? <RefreshCw className="spin" size={18} /> : (
                          <>{t.submitLogin} <ArrowRight size={18} /></>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* Already logged in devotee in Step 2 */
                <div className="account-confirmed-card">
                  <div className="account-user-row">
                    <CheckCircle2 size={36} color="#2e6b35" />
                    <div>
                      <h3>{t.accountReady(user.name)}</h3>
                      <p>{user.email || user.phone} • {user.phone ? `+91 ${user.phone}` : ''}</p>
                    </div>
                  </div>
                  <div className="account-plan-row">
                    <span>{t.selectedKitLabel}</span>
                    <strong>{currentKitInfo.name} — ₹{currentKitInfo.price}</strong>
                  </div>
                  <div className="account-action-buttons">
                    <button className="btn-proceed-to-payment" onClick={() => setStep('payment')}>
                      {t.proceedToPayment} (₹{currentKitInfo.price}) <ArrowRight size={18} />
                    </button>
                    <button className="btn-switch-account" onClick={handleLogout}>
                      {t.switchAccount}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 'payment' && (
          <div className="step-container step-payment-view">
            <div className="step-nav-bar">
              <button className="btn-step-back" onClick={() => setStep(user ? 'select' : 'account')}>
                <ArrowLeft size={16} /> {user ? t.changeKit : t.backToAccount}
              </button>
              <div className="step-context-pill">
                <span>{isHindi ? 'भक्त:' : 'Devotee:'} <strong>{user?.name || name}</strong></span>
              </div>
            </div>

            <div className="checkout-section-container">
              <div className="payment-checkout-card">
                <div className="checkout-header">
                  <CreditCard size={24} className="gold-icon" />
                  <div>
                    <h3>{t.orderHeaderTitle}</h3>
                    <p>{t.orderHeaderSub(user?.name || name, user?.email || email || user?.phone || phone)}</p>
                  </div>
                </div>

                <div className="order-summary-box">
                  <div className="summary-line">
                    <span>{t.selectedPackage}</span>
                    <strong>{currentKitInfo.name}</strong>
                  </div>
                  <div className="summary-line">
                    <span>{t.regularPrice}</span>
                    <span className="strikethrough">₹{currentKitInfo.origPrice}</span>
                  </div>
                  <div className="summary-line">
                    <span>{t.diwaliDiscount}</span>
                    <span className="green-text">-₹{currentKitInfo.origPrice - currentKitInfo.price}</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-total">
                    <span>{t.totalPayable}</span>
                    <strong>₹{currentKitInfo.price}</strong>
                  </div>
                </div>

                <div className="payment-modes-info">
                  <span>{t.acceptedMethods}</span>
                  <div className="payment-badges">
                    <span className="pay-badge">UPI / QR</span>
                    <span className="pay-badge">Google Pay</span>
                    <span className="pay-badge">PhonePe</span>
                    <span className="pay-badge">Paytm</span>
                    <span className="pay-badge">Cards &amp; NetBanking</span>
                  </div>
                </div>

                {paymentSuccess ? (
                  <div className="payment-success-badge">
                    <CheckCircle2 size={24} />
                    <span>{t.paymentVerified}</span>
                  </div>
                ) : (
                  <button
                    className="btn-pay-now"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <><RefreshCw className="spin" size={18} /> {t.processingPayment}</>
                    ) : (
                      <>{t.payNow(currentKitInfo.price)} <ChevronRight size={18} /></>
                    )}
                  </button>
                )}

                <div className="checkout-trust-row">
                  <span>{t.secureTransaction}</span>
                  <span>{t.instantDelivery}</span>
                  <span>{t.diwaliSupport}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
