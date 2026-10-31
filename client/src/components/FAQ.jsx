import React, { useState } from 'react';
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQ({ t, lang = 'en' }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section faq-section" id="faqs">
      <div className="section-heading">
        <span className="section-kicker">{t.faqKicker || "WE'RE HERE TO HELP"}</span>
        <h2>{t.faqTitle}</h2>
      </div>

      <div className="faq-list">
        {faqs.map(([qEn, qHi, aEn, aHi], i) => {
          const question = lang === 'hi' ? qHi : qEn;
          const answer = lang === 'hi' ? aHi : aEn;

          return (
            <article className="faq-item" key={qEn}>
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                aria-expanded={active === i}
              >
                <span>{question}</span>
                {active === i ? <Minus size={18}/> : <Plus size={18}/>}
              </button>
              {active === i && <p>{answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
