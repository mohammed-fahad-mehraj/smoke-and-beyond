import { Phone, MapPin } from "lucide-react";

export function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 w-full z-40 pb-safe">
      <div className="bg-card/90 backdrop-blur-lg border-t border-white/10 px-2 py-3 flex justify-around items-center">
        <a 
          href="tel:+14304350477" 
          className="flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors p-2"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-1">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
        </a>
        
        <a 
          href="#locations" 
          className="flex flex-col items-center gap-1 text-primary hover:text-primary/80 transition-colors p-2 -translate-y-4"
        >
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25 border-4 border-background">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Find Us</span>
        </a>

        <a 
          href="https://www.instagram.com/puff_beyond" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors p-2"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-1">
            
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Insta</span>
        </a>
      </div>
    </div>
  );
}
