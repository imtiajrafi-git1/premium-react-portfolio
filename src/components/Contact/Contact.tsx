import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMail, FiSend } from "react-icons/fi";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SectionHeader from "../SectionHeader";

type FormStatus = "idle" | "sending" | "sent" | "not-configured" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("not-configured");
      return;
    }

    if (!formRef.current) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact section-shell" id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Ready to bring your ideas to life?"
        description="I'm always open to meaningful conversations, creative opportunities, and exciting projects. Send a message, and let's discuss how we can build something remarkable together."
      />
      <div className="contact__layout">
        <motion.div
          className="contact__note contact__note--option-b"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.35 }}
        >
          <div className="contact__note__head">
            <div className="contact__note__icon">
              <FiMail aria-hidden="true" />
            </div>
            <h3>Let's Connect</h3>
          </div>
          <p className="contact__note-subtitle">Bring your ideas to life.</p>
          <p>
            Share your vision, goals, or project details, and I'll get back to you as soon as possible. I'm looking forward to hearing from you.
          </p>

          <div className="contact__contact-links">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=imtiajrafi7824%40gmail.com&su=Portfolio%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__contact-link contact__contact-link--email"
              aria-label="Compose a Gmail message to imtiajrafi7824@gmail.com"
            >
              <span className="contact__email-icon"><FiMail aria-hidden="true" /></span>
              <span className="contact__email-copy">
                <small>EMAIL · DIRECT INQUIRY</small>
                <strong>imtiajrafi7824@gmail.com</strong>
              </span>
              <span className="contact__email-action" aria-hidden="true"><FiArrowUpRight /></span>
            </a>
            <a href="https://wa.me/8801622957646" target="_blank" rel="noopener noreferrer" className="contact__contact-link contact__contact-link--whatsapp">
              <span className="contact__whatsapp-icon"><FaWhatsapp aria-hidden="true" /></span>
              <span className="contact__whatsapp-copy">
                <small>WHATSAPP · QUICK CHAT</small>
                <strong>01622957646</strong>
              </span>
              <span className="contact__whatsapp-action" aria-hidden="true"><FiArrowUpRight /></span>
            </a>
          </div>

          <div className="contact__social" aria-label="Social media links">
            <a href="https://www.facebook.com/share/1JM7AaFrQ7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="https://github.com/imtiajrafi-git1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/rafu_002" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/imtiaj-ahmed-rafi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a href="https://twitter.com/imtiajrafi" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.form
          className="contact__form glass-reflection"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.35, delay: 0.04 }}
        >
          <label>
            <span>Name</span>
            <input name="from_name" type="text" placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="from_email" type="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>Project Brief</span>
            <textarea name="message" placeholder="Tell me what you want to build" rows={5} required />
          </label>
          <button className="button button--primary ripple" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
            <FiSend aria-hidden="true" />
          </button>
          <p className={`contact__status contact__status--${status}`} aria-live="polite">
            {status === "sent" ? "Your message was sent successfully." : null}
            {status === "not-configured" ? "Direct email sending is not configured yet. Add the EmailJS settings to enable it." : null}
            {status === "error" ? "Something went wrong. Please email directly instead." : null}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
