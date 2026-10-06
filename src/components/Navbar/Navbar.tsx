import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload, FiHome, FiUser, FiBookOpen, FiZap, FiTool, FiFolder, FiCamera, FiMail } from "react-icons/fi";
import { useScrollFlag } from "../../hooks/useScrollFlag";

const RESUME_URL =
  "https://docs.google.com/document/d/184F77HXlLqMK2VxUymVlMc54EGor1FIr/edit?usp=drive_link&ouid=107357776728291535466&rtpof=true&sd=true";

const navItems = [
  { label: "Home", href: "#home", Icon: FiHome },
  { label: "About", href: "#about", Icon: FiUser },
  { label: "Education", href: "#about", Icon: FiBookOpen },
  { label: "Skills", href: "#skills", Icon: FiZap },
  { label: "Services", href: "#services", Icon: FiTool },
  { label: "Projects", href: "#projects", Icon: FiFolder },
  { label: "Photography", href: "#photography", Icon: FiCamera },
  { label: "Contact", href: "#contact", Icon: FiMail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollFlag(18);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <a className="navbar__brand" href="#home" aria-label="Imtiaj Ahmed Rafi home">
          <span>IAR</span>
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <a
            className="navbar__resume"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>

        <button
          className={`navbar__toggle ${isOpen ? "navbar__toggle--active" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
          >
            <motion.div className="mobile-menu__inner">
              <ul className="mobile-menu__list">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mobile-menu__icon">
                        <item.Icon aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                className="mobile-menu__resume"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <FiDownload aria-hidden="true" />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
