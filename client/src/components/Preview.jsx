import React from 'react';
import { FileSearch, PlayCircle } from "lucide-react";

export default function Preview({ t }) {
  return (
    <section className="section preview-section">
      <div className="section-heading">
        <span className="section-kicker">TAKE A CLOSER LOOK</span>
        <h2>{t.previewTitle}</h2>
        <p>Preview real sample pages and a short video before choosing your Puja Kit.</p>
      </div>
      <div className="preview-grid">
        <article className="preview-card">
          <div className="preview-paper"><span>॥ श्री गणेशाय नमः ॥</span><strong>श्री लक्ष्मी-गणेश पूजन विधि</strong><i>Sample PDF page</i><div className="paper-lines"/></div>
          <div><FileSearch/><h3>PDF Preview</h3><p>Show 2–3 genuine sample pages from your guide.</p><a href="#product">View sample pages →</a></div>
        </article>
        <article className="preview-card">
          <div className="video-placeholder"><PlayCircle size={54}/><span>YOUR VIDEO PREVIEW</span></div>
          <div><PlayCircle/><h3>Video Preview</h3><p>Embed a genuine 30–60 second explanation clip.</p><a href="#product">Watch sample video →</a></div>
        </article>
      </div>
    </section>
  );
}
