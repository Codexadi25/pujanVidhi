import React, { useState } from 'react';
import { FileText, PlayCircle, Eye, ArrowRight, X, CheckCircle2, Sparkles, BookOpen } from "lucide-react";

export default function Preview({ t, onOpenBuy }) {
  const [activeTab, setActiveTab] = useState('chowki');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const previewSnippets = {
    chowki: {
      title: "1. चौकी व कलश स्थापना (Altar & Kalash Setup)",
      desc: "Illustrated guidance for sanctifying your home altar and invoking Varuna Devta.",
      lines: [
        "• उत्तर या पूर्व दिशा में लकड़ी की साफ चौकी बिछाकर उस पर लाल या पीला नया वस्त्र बिछाएं।",
        "• चौकी के दाईं ओर माँ लक्ष्मी तथा बाईं ओर विघ्नहर्ता भगवान श्री गणेश की प्रतिमा स्थापित करें।",
        "• तांबे या पीतल के कलश में शुद्ध जल, गंगाजल, सुपारी, सिक्का, अक्षत व दूर्वा डालकर आम के पांच पल्लव रखें।",
        "• कलश पर मौली बांधकर उस पर पूर्णपात्र (चावल से भरी कटोरी) और उस पर जटा वाला नारियल रखें।"
      ]
    },
    sankalp: {
      title: "2. आचमन, प्राणायाम व पावन संकल्प (Sankalp & Ganesh Dhyan)",
      desc: "Family intention setting with authentic Sanskrit mantras and Hindi meanings.",
      lines: [
        "• आचमन मंत्र: ॐ केशवाय नमः, ॐ नारायणाय नमः, ॐ माधवाय नमः। ॐ हृषीकेशाय नमः (हस्त प्रक्षालन)।",
        "• पवित्रिकरण: ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा। यः स्मरेत्पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥",
        "• गणेश ध्यान: गजाननं भूतगणादिसेवितं कपित्थजम्बूफलचारुभक्षणम्। उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वरपादपंकजम्॥",
        "• संकल्प: हाथ में जल, अक्षत, पुष्प और दक्षिणा लेकर परिवार के कल्याण व माँ लक्ष्मी की कृपा हेतु संकल्प लें।"
      ]
    },
    lakshmi: {
      title: "3. माँ महालक्ष्मी षोडशोपचार पूजन (16-Step Lakshmi Puja)",
      desc: "Complete traditional sequence: Aavahan, Asana, Padya, Arghya, Snan, Vastra, Naivedya.",
      lines: [
        "• ध्यान मंत्र: ॐ ह्रीं श्रीं क्लीं महालक्ष्मै नमः। नमस्ते सर्वगेहेषु सर्वशक्तिस्वरूपिणी॥",
        "• कमल व लाल पुष्प अर्पण: माँ लक्ष्मी को कमल गट्टे, गुलाब अथवा लाल पुष्प अति प्रिय हैं।",
        "• अष्टलक्ष्मी व कुबेर पूजन: धन के देवता कुबेर, तिजोरी, बही-खाता व व्यापारिक पुस्तकों का पूजन।",
        "• नैवेद्य अर्पण: खीर, बताशे, अनार, सिंघाड़ा, कमलगट्टे व पंचामृत का पावन भोग समर्पित करें।"
      ]
    },
    aarti: {
      title: "4. १४ दीपदान व पावन महाआरती (14 Diyas & Maha Aarti)",
      desc: "The sacred lighting of 14 traditional mustard oil / ghee lamps followed by family Aarti.",
      lines: [
        "• चौमुखा मुख्य दीपक: सबसे बड़ा घी या तिल के तेल का दीपक प्रज्वलित कर चौकी पर मध्य में रखें।",
        "• १४ दीपकों का क्रम: मुख्य द्वार, रसोई, तुलसी चौरा, जल स्थान, तिजोरी व छत पर दीप प्रज्वलित करें।",
        "• महाआरती: सपरिवार खड़े होकर 'जय गणेश देवा' तथा 'ॐ जय लक्ष्मी माता' की संपूर्ण आरती करें।",
        "• पुष्पांजलि व क्षमा याचना: आवाहनं न जानामि न जानामि विसर्जनम्। पूजां चैव न जानामि क्षमस्व परमेश्वरि॥"
      ]
    }
  };

  const current = previewSnippets[activeTab];

  return (
    <section className="section preview-section" id="preview" style={{ background: "#fffdf9", padding: "80px 24px" }}>
      <div className="section-heading" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 36px" }}>
        <span className="section-kicker">{t.previewKicker || "LOOK INSIDE YOUR GUIDE"}</span>
        <h2>{t.previewTitle}</h2>
        <p style={{ color: "#795f50", fontSize: "15px", marginTop: "8px" }}>
          Explore genuine excerpts of the sacred mantras, ritual steps, and video demonstration before getting started.
        </p>
      </div>

      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        {/* Interactive Tab Switcher */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "28px"
        }}>
          {[
            { id: 'chowki', label: '🪔 चौकी व कलश स्थापना' },
            { id: 'sankalp', label: '🕉️ संकल्प व गणेश ध्यान' },
            { id: 'lakshmi', label: '🌸 माँ महालक्ष्मी पूजन' },
            { id: 'aarti', label: '✨ दीपदान व महाआरती' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "var(--maroon)" : "#fffaf2",
                color: activeTab === tab.id ? "#fff5e6" : "#5a3a2a",
                border: activeTab === tab.id ? "1px solid var(--maroon)" : "1px solid #e5d4be",
                padding: "10px 18px",
                borderRadius: "99px",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: activeTab === tab.id ? "0 4px 12px rgba(75, 23, 22, 0.2)" : "none"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Interactive Showcase Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          alignItems: "stretch"
        }}>
          
          {/* Left: Authentic Excerpt Reader Card */}
          <div style={{
            background: "#fffdf9",
            border: "2px solid #e8d7c2",
            borderRadius: "14px",
            padding: "28px",
            boxShadow: "0 6px 25px rgba(53, 18, 14, 0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--red)", letterSpacing: "1px", textTransform: "uppercase" }}>
                  📖 GENUINE PUJA VIDHI EXCERPT
                </span>
                <span style={{ fontSize: "11px", background: "#f5e8d6", color: "#6c412e", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
                  Sample Reader View
                </span>
              </div>

              <h3 style={{ fontSize: "20px", color: "var(--maroon)", margin: "0 0 6px", fontFamily: "var(--serif, Cormorant Garamond, serif)" }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#8a6c5a", marginBottom: "16px" }}>
                {current.desc}
              </p>

              <div style={{
                background: "#fffaf2",
                border: "1px solid #ebd9c3",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                {current.lines.map((line, idx) => (
                  <p key={idx} style={{ margin: 0, fontSize: "13px", color: "#42281d", lineHeight: "1.7" }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <small style={{ color: "#8c6e5c", fontSize: "11px" }}>
                ✓ Clean Hindi with Sanskrit mantras • No obscure jargon
              </small>
              <button
                className="button button-small"
                style={{ cursor: "pointer", padding: "8px 14px", fontSize: "12px" }}
                onClick={() => onOpenBuy && onOpenBuy('kit')}
              >
                Get Text Guide (₹21) →
              </button>
            </div>
          </div>

          {/* Right: Authentic Video Demonstration Teaser */}
          <div style={{
            background: "linear-gradient(145deg, #3d1413, #220807)",
            border: "2px solid #c69a43",
            borderRadius: "14px",
            padding: "28px",
            color: "#fff2db",
            boxShadow: "0 10px 30px rgba(53, 18, 14, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#fce2a6", letterSpacing: "1px", textTransform: "uppercase" }}>
                  🎥 FULL HD VIDEO WALKTHROUGH
                </span>
                <span style={{ fontSize: "11px", background: "rgba(217, 168, 82, 0.25)", color: "#fbe2aa", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
                  Included in Complete Guide
                </span>
              </div>

              <div
                style={{
                  background: "radial-gradient(circle, #5a1d1a 0%, #2b0c0a 100%)",
                  border: "1px dashed rgba(217, 168, 82, 0.4)",
                  borderRadius: "10px",
                  height: "170px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginBottom: "16px",
                  textAlign: "center",
                  padding: "16px"
                }}
                onClick={() => setShowVideoModal(true)}
                title="Click to view full video walkthrough details"
              >
                <PlayCircle size={52} style={{ color: "#fce2a6", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))" }}/>
                <strong style={{ fontSize: "14px", color: "#fff4df", marginTop: "10px" }}>
                  Step-by-Step Diwali Video Masterclass
                </strong>
                <span style={{ fontSize: "11px", color: "#f3d39b", marginTop: "3px" }}>
                  Watch ritual gestures, Diya lighting &amp; listen to mantra pronunciation
                </span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#edd2ba" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2 size={14} style={{ color: "#d9a852" }}/> 
                  <span>High-definition video filmed with authentic Pandit guidance</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2 size={14} style={{ color: "#d9a852" }}/> 
                  <span>Clear audio for accurate Sanskrit pronunciation and swara</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2 size={14} style={{ color: "#d9a852" }}/> 
                  <span>Pause, rewind &amp; play right next to your Puja Chowki on any phone</span>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setShowVideoModal(true)}
                style={{ background: "none", border: "none", color: "#fce2a6", fontSize: "12px", textDecoration: "underline", cursor: "pointer", padding: 0 }}
              >
                View Video Ritual List
              </button>
              <button
                className="button button-gold"
                style={{ cursor: "pointer", padding: "8px 14px", fontSize: "12px" }}
                onClick={() => onOpenBuy && onOpenBuy('video_kit')}
              >
                Get Video Guide (₹121) →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Video Details Modal */}
      {showVideoModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18, 5, 5, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              background: "#240b09",
              border: "1px solid #d9a852",
              borderRadius: "14px",
              padding: "26px",
              maxWidth: "540px",
              width: "100%",
              color: "#fff3db",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#fce2a6" }}>
                🪔 Complete Video Masterclass Overview
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                style={{ background: "none", border: "none", color: "#fce2a6", fontSize: "22px", cursor: "pointer" }}
              >
                <X size={22}/>
              </button>
            </div>

            <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#e5cbb2", marginBottom: "16px" }}>
              The Full HD Video Walkthrough is designed for families who want zero hesitation. Follow along with:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#fce8c3", marginBottom: "22px" }}>
              <div>• <strong>Part 1:</strong> Chowki &amp; Kalash Sthapana altar layout</div>
              <div>• <strong>Part 2:</strong> Sankalp, Achaman &amp; Ganesh Dhyan with mantra chanting</div>
              <div>• <strong>Part 3:</strong> Maa Lakshmi 16-step Shodashopachara rituals demonstration</div>
              <div>• <strong>Part 4:</strong> Kuber, Bahi-Khata &amp; Tijori worship</div>
              <div>• <strong>Part 5:</strong> Traditional 14 Diya Deepdaan sequence across the home</div>
              <div>• <strong>Part 6:</strong> Full family Aarti &amp; Pushpanjali</div>
            </div>

            <button
              className="button button-gold"
              style={{ width: "100%", justifyContent: "center", padding: "14px" }}
              onClick={() => {
                setShowVideoModal(false);
                onOpenBuy && onOpenBuy('video_kit');
              }}
            >
              Unlock Complete Video Guide (₹121) <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
