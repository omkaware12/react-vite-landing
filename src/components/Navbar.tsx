import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "#expertise" },
  { label: "Blogs", href: "#" },
  { label: "Our Centers", href: "#footer" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-ayurveda-green shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display font-bold text-primary-foreground tracking-wide">
            Rohati Ayurved
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary-foreground/90 hover:text-primary-foreground font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-ayurveda-green/95 backdrop-blur-sm flex flex-col items-center gap-4 py-6 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary-foreground text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
