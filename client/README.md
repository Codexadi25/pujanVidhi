# poojanvidhi homepage starter

A component-based React + Vite landing page for the poojanvidhi Diwali 2026 digital Puja guide.

## Run locally

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

## Project structure

- `src/Page.jsx` – page composition and language state
- `src/components/` – independent homepage sections
- `src/data/content.js` – bilingual copy, feature list, steps and FAQs
- `src/styles.css` – responsive visual system
- `public/images/` – place your licensed artwork and family image here

## Important customisation before launch

1. Replace the deity placeholders in `Hero.jsx` with your final Lakshmi Ji and Ganesh Ji artwork. Use a single consistent art direction and preserve full figures.
2. Replace the family placeholder in `FamilyBlessings.jsx` with your `family.png`. Put the file at `public/images/family.png` and update the component to use `/images/family.png`.
3. Replace the product mockup in `Product.jsx` with actual screenshots or rendered images of the paid PDF.
4. Replace the video preview placeholder with your actual sample video.
5. Set real product price, language availability, delivery and refund terms.
6. Connect the purchase CTA to a secure checkout provider. Do not collect or process card details directly in this frontend.
7. Verify all Hindi translations and all religious procedures/mantras with a qualified reviewer.
8. Muhurat information must be location-specific and reviewed against a declared Panchang source. Do not present a generic or unverified time as authoritative.
9. Replace the placeholder email address and add real privacy, terms, refund and contact pages.
10. Update the page metadata and add production SEO, analytics, cookie/privacy notices where applicable.

## Notes

- The current CTA is a placeholder and links to the product section or an email enquiry. It does not take payments.
- The current artwork areas are intentional placeholders, not final deity or family imagery.
- FAQ text is starter copy and should be checked against the actual product.
- The language switcher translates the principal homepage copy and navigation; the feature cards, step cards and FAQ data currently remain English and should be localised before launch.
