import { Phone, MapPin, Camera } from "lucide-react";

export function MobileBottomBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="grid grid-cols-3 items-end rounded-[28px] border border-white/10 bg-card/95 px-2 pt-3 pb-2 shadow-2xl backdrop-blur-xl">
        <a 
          href="tel:+14304350477" 
          className="flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors py-2"
        >
          <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]">Call</span>
        </a>
        
        <a 
          href="#locations" 
          className="flex flex-col items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        >
          <div className="-mt-7 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/25">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Find Us</span>
        </a>

        <a 
          href="https://www.instagram.com/puff_beyond" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors py-2"
        >
          <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]">Insta</span>
        </a>
      </div>
    </div>
  );
}
