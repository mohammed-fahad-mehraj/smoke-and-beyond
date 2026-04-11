import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

export function AgeVerification({ onVerify }: { onVerify: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified");

    if (!verified) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      onVerify();
    }
  }, [onVerify]);

  const handleVerify = () => {
    localStorage.setItem("age_verified", "true");
    setIsOpen(false);
    onVerify();
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md p-8 text-center glass-panel rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -z-10" />

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Flame className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl font-bold font-display text-foreground mb-2">
              Are you 21 or older?
            </h2>

            <p className="text-muted-foreground mb-8">
              You must be 21 years of age or older to enter this site and view our products.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleVerify}
                className="flex-1 px-6 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:scale-105 transition"
              >
                Yes, I am 21+
              </button>

              <button
                onClick={handleReject}
                className="flex-1 px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                No, Exit
              </button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground/60">
              By entering this site you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}