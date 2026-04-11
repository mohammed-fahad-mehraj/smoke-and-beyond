import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, ArrowRight, Star, Clock, CheckCircle2, ChevronRight, Wind, Camera, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dealsData from "./data/deals.json";
import { AgeVerification } from "./components/AgeVerification";
import { Navbar } from "./components/Navbar";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { Footer } from "./components/Footer";

// --- Form Schema ---
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [formSuccess, setFormSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setFormSuccess(true);
    reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-28 text-foreground md:pb-0">
      <AgeVerification onVerify={() => undefined} />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[680px] items-center justify-center overflow-hidden pt-24 pb-20 sm:min-h-[600px] sm:pt-20 sm:pb-12 md:h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}hero-bg.png`}
            alt="Puff and Beyond Smoke Shop" 
            className="h-full w-full object-cover object-[center_22%] opacity-60 sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md"
          >
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Est. Texas</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-4xl leading-none font-display font-bold tracking-tight text-white text-glow sm:text-5xl md:text-7xl lg:text-8xl"
          >
            PREMIUM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">SMOKE SHOP</span> <br/>
            EXPERIENCE
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/75 sm:max-w-2xl sm:text-lg md:text-xl"
          >
            Vapes • Hookah • Premium Glass • Cigars • Accessories
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <a 
              href="#locations" 
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover-elevate sm:px-8"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
            <a 
              href="tel:+14304350477" 
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:px-8"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-16 sm:gap-8"
          >
            {['21+ Only', 'Top Brands', 'Best Prices in Town'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-xs font-medium text-white/55 sm:text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCTS CATEGORIES --- */}
      <section id="products" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">What We Carry</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our extensive selection of top-tier products. We only stock the best to ensure you get the quality you deserve.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Vapes", desc: "Latest disposables, mods & pods from top brands", img: "vapes.jpg" },
              { title: "CBD Products", desc: "Hydrate, relax, and recover with high-quality CBD drinks, oils, and targeted relief topicals.", img: "cbd1.jpg" },
              { title: "Glass & Bongs", desc: "Hand-blown glass pipes, bongs & unique pieces", img: "cat-glass.png" },
              { title: "Rolling Papers", desc: "RAW, Zig-Zag & premium rolling accessories", img: "insta-3.png" },
              { title: "Cigars", desc: "Premium cigars from top tobacco brands", img: "cat-cigar.png" },
              { title: "Accessories", desc: "Grinders, lighters, cases, cleaners & more", img: "insta-2.png" },
            ].map((cat, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                  <img 
                    src={`${import.meta.env.BASE_URL}${cat.img}`}
                    alt={cat.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <div className="p-6 relative z-10 -mt-12">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{cat.desc}</p>
                  <a href="#locations" className="inline-flex items-center gap-2 text-primary font-medium group-hover:text-white transition-colors">
                    Visit Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center text-sm text-muted-foreground/60">
            * Inventory changes frequently. Visit store or call for current availability.
          </div>
        </div>
      </section>

      {/* --- BRANDS MARQUEE --- */}
      <section id="brands" className="py-16 bg-card border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="text-2xl font-display font-bold text-white/90">Top Brands We Carry</h2>
        </div>
        <div className="flex w-full overflow-hidden">
          {/* Double up for seamless loop effect conceptually - tailwind arbitrary animation */}
          <div className="flex animate-pulse-slow whitespace-nowrap gap-12 sm:gap-24 px-12 items-center">
            {['RAW', 'SMOK', 'Geek Bar', 'Juul', 'Elf Bar', 'Lost Mary', 'Puff Bar', 'Backwoods', 'Swisher Sweets', 'Hyde'].map((brand, i) => (
              <div 
                key={i} 
                className="text-2xl sm:text-4xl font-display font-bold text-white/20 hover:text-primary transition-colors cursor-default"
                title="Available in store"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DEALS SECTION --- */}
      <section id="deals" className="py-24 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">This Week's Deals</h2>
              <div className="w-24 h-1 bg-primary rounded-full" />
            </motion.div>
            <p className="text-muted-foreground mt-4 md:mt-0 max-w-sm">
              Exclusive in-store offers. Show this page to our staff to redeem.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {dealsData.map((deal) => (
              <motion.div 
                key={deal.id}
                variants={fadeUp}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
                
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-primary/30">
                  {deal.badge}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-3">{deal.title}</h3>
                <p className="text-muted-foreground mb-8 line-clamp-3">{deal.description}</p>
                
                <a 
                  href="#locations" 
                  className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  Claim in Store <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-24 bg-card/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">What Customers Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { text: "Best smoke shop in town! Amazing selection and super friendly staff.", author: "Marcus T." },
              { text: "Found my favorite vape here at the best price. Will definitely be back!", author: "Sarah M." },
              { text: "They always have what I need. Great deals every week! Highly recommend.", author: "Jordan K." },
              { text: "Huge variety of hookah products. The staff really knows their stuff.", author: "Alex R." },
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-6 rounded-2xl border border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">"{review.text}"</p>
                <p className="text-primary font-medium text-sm">{review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTAGRAM --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">Follow The Culture</h2>
            <p className="text-primary font-medium">@puff_beyond</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((imgNum, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                <img 
                  src={`${import.meta.env.BASE_URL}insta-${imgNum}.png`}
                  alt="Instagram post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="https://www.instagram.com/puff_beyond" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all hover:-translate-y-1"
            >
              <Camera className="w-5 h-5" />
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* --- LOCATIONS --- */}
      <section id="locations" className="py-24 bg-card border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Find Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Location 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-2">Brownsboro</h3>
              <p className="text-muted-foreground mb-6">Premium Smoke Shop Experience</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a href="tel:+14304350477" className="hover:text-primary transition-colors text-lg">(430) 435-0477</a>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
                    <p className="text-muted-foreground">Sun: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <a href="mailto:puffandbeyondnumber11@gmail.com" className="hover:text-primary transition-colors text-sm break-all">puffandbeyondnumber11@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Puff+and+Beyond+Brownsboro+TX" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl text-center hover-elevate"
                >
                  Directions
                </a>
                <a 
                  href="tel:+14304350477" 
                  className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Call
                </a>
              </div>
            </motion.div>

            {/* Location 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-2">Grand Saline</h3>
              <p className="text-muted-foreground mb-6">Premium Smoke Shop Experience</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a href="tel:+14304370465" className="hover:text-primary transition-colors text-lg">(430) 437-0465</a>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
                    <p className="text-muted-foreground">Sun: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <a href="mailto:puffandbeyondnumber12@gmail.com" className="hover:text-primary transition-colors text-sm break-all">puffandbeyondnumber12@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Puff+and+Beyond+Grand+Saline+TX" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl text-center hover-elevate"
                >
                  Directions
                </a>
                <a 
                  href="tel:+14304370465" 
                  className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Call
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-80 rounded-3xl bg-background border border-white/5 overflow-hidden relative flex items-center justify-center">
            {/* Real implementation would use an iframe here */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&h=800&fit=crop')] opacity-20 object-cover mix-blend-luminosity" />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            <div className="relative z-10 text-center px-4">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Visit Us In Store</h3>
              <p className="text-white/60">Search 'Puff & Beyond' on Google Maps</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">Have a question about stock or prices? Send us a message.</p>
          </motion.div>

          <div className="bg-card p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            {formSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setFormSuccess(false)}
                  className="mt-8 px-6 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                  <input
                    {...register("name")}
                    id="name"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover-elevate transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}
