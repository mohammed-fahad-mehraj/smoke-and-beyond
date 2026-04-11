import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Brands", href: "#brands" },
  { name: "Deals", href: "#deals" },
  { name: "Locations", href: "#locations" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              PUFF <span className="text-primary">&</span> BEYOND
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#locations"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium text-sm transition-all border border-white/5 backdrop-blur-md"
            >
              Visit Store
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-card/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/80 hover:text-primary p-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#locations"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center px-5 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                Visit Store
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
