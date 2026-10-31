import React from 'react';
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQ({ t }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq-section" id="faqs">
      <div className="section-heading"><span className="section-kicker">WE'RE HERE TO HELP</span><h2>{t.faqTitle}</h2></div>
      <div className="faq-list">
        {faqs.map(([question, answer], i) => <article className="faq-item" key={question}>
          <button onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i}>
            {question}{active === i ? <Minus size={18}/> : <Plus size={18}/>}
          </button>
          {active === i && <p>{answer}</p>}
        </article>)}
      </div>
    </section>
  );
}
