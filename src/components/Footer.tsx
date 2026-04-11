import { Flame, MapPin, Phone, Mail, Camera } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white">
                PUFF <span className="text-primary">&</span> BEYOND
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The premium smoke shop experience. Your ultimate destination for vapes, glass, hookahs, and accessories in Texas.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/puff_beyond" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Camera className="h-5 w-5" />
                </span>
                <span className="tracking-wide">Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Products', 'Brands', 'Deals', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brownsboro */}
          <div>
            <h3 className="text-white font-display font-semibold mb-4 text-primary">Brownsboro Location</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
                <span>Puff & Beyond – Brownsboro</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 shrink-0" />
                <a href="tel:+14304350477" className="hover:text-white transition-colors">(430) 435-0477</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 shrink-0" />
                <a href="mailto:puffandbeyondnumber11@gmail.com" className="hover:text-white transition-colors truncate">puffandbeyondnumber11@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Grand Saline */}
          <div>
            <h3 className="text-white font-display font-semibold mb-4 text-primary">Grand Saline Location</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
                <span>Puff & Beyond – Grand Saline</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 shrink-0" />
                <a href="tel:+14304370465" className="hover:text-white transition-colors">(430) 437-0465</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 shrink-0" />
                <a href="mailto:puffandbeyondnumber12@gmail.com" className="hover:text-white transition-colors truncate">puffandbeyondnumber12@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Puff & Beyond. All rights reserved. 
            <span className="block mt-1">Must be 21+ to purchase tobacco or vapor products.</span>
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
