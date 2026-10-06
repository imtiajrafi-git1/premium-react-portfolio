# Imtiaj Ahmed Rafi Portfolio

Premium day-mode React portfolio built with Vite, CSS3, Framer Motion, GSAP, React Icons, Lenis smooth scroll, and EmailJS-ready contact handling.

## Highlights

- No Tailwind CSS, dark mode, theme toggle, or custom cursor.
- Redesigned hero with left-side identity and right-side premium profile card.
- Compact responsive layouts for mobile.
- Education card, luxury journey timeline, photography gallery, stats, social links, projects, testimonials, and contact form.
- The contact form sends directly through EmailJS; it does not open Gmail compose.

## Enable direct contact-form email

1. Create an EmailJS account and connect the email service that should deliver messages to `imtiajrafi7824@gmail.com`.
2. Create an EmailJS template that sends to that address and uses the form fields `from_name`, `from_email`, and `message`.
3. Copy `.env.example` to `.env.local` and replace its placeholder values with your EmailJS service ID, template ID, and public key.
4. Restart the Vite dev server after editing `.env.local`.

Until those EmailJS settings are present, the form displays a setup message instead of pretending it sent the email.

## Production performance

- `npm run build` emits minified, hashed CSS/JS assets and separate section chunks so browsers can cache assets and load below-the-fold code on approach.
- Deploy the complete `dist/` directory. Configure the host/CDN to serve Brotli or gzip and cache `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`; keep `index.html` revalidated so new hashed bundles are discovered.
- The hero portrait is the only preloaded image. Google Drive card images are lazy-loaded and request width-appropriate 480px/800px thumbnails.
- Image delivery and Lighthouse scores depend on hosting compression, network/device conditions, and the availability/sharing permissions of the external Google Drive images; verify the deployed URL with Lighthouse on target devices.
