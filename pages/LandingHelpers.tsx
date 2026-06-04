import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, Users, X } from 'lucide-react';
import { CountryConfig } from '../lib/countryConfig';
import { useCountry } from '../lib/CountryContext';

export const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const TIMES = ["2 min ago","5 min ago","8 min ago","12 min ago","15 min ago","18 min ago","22 min ago","25 min ago","30 min ago","33 min ago"];

export function getJoiners(c: CountryConfig) {
  return c.cities.map((p, i) => ({ name: p.name, city: p.city, time: TIMES[i % TIMES.length] }));
}

export const PROBLEM_POINTS = [
  { emoji: "💸", text: "Stuck in the 'Cheap Designer' trap? Charging peanuts for designs and losing clients because you cannot show the high-end photorealistic renders that wealthy clients pay millions for?" },
  { emoji: "📉", text: "Watching the Naira crash while your salary stays flat? Knowing you desperately need to land premium Lekki, Abuja, or remote USD clients to survive, but lacking the portfolio to prove your worth?" },
  { emoji: "💻", text: "Wasting gigabytes of expensive data watching scattered, incomplete YouTube videos that leave you frustrated and unable to complete a real design from start to finish?" }
];

export function getTransformationStories(c: CountryConfig) {
  return [
    { 
      name: "Funke B.", 
      role: `Freelance Designer, Lagos`, 
      before: `Was stuck charging ₦20k-₦30k per project. Wasted months on YouTube tutorials that left her confused. Her models looked amateur, V-Ray kept crashing, and clients would look at her basic drawings and price her down.`, 
      after: `Mastered the AutoCAD → SketchUp → D5 Render AI pipeline in 15 days. She now confidently quotes ₦250k+ per room. Wealthy Lekki clients pay her upfront deposits without a single argument because her renders look like real photographs.`, 
      emoji: "💰" 
    },
    { 
      name: "Obinna C.", 
      role: `Architecture Graduate, Abuja`, 
      before: "Spent 5 years in university only to be taught outdated hand-drafting. Had zero professional rendering portfolio to show architecture firms in Abuja, looking at a starting salary of just ₦50k/month.", 
      after: `Followed our exact 15-day roadmap. He built a stunning, high-end residential 3D portfolio. Landed a design role at an Abuja studio paying ₦350k/month before his final exams, plus runs a freelance studio on the side.`, 
      emoji: "🎓" 
    }
  ];
}

export const PAGE_PREVIEWS_ROW1 = [
  '/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg',
  '/renders/RENDER-4.jpg', '/renders/RENDER-5.jpg', '/renders/RENDER-6.jpg',
  '/renders/RENDER-7.jpg', '/renders/RENDER-8.jpg', '/renders/RENDER-9.jpg',
  '/renders/RENDER-10.jpg', '/renders/RENDER-11.jpg', '/renders/RENDER-12.jpg',
  '/renders/RENDER-13.jpg',
];
export const PAGE_PREVIEWS_ROW2 = [
  '/renders/RENDER-14.jpg', '/renders/RENDER-15.jpg', '/renders/RENDER-16.jpg',
  '/renders/RENDER-17.jpg', '/renders/RENDER-18.jpg', '/renders/RENDER-19.jpg',
  '/renders/RENDER-20.jpg', '/renders/RENDER-21.jpg', '/renders/RENDER-22.jpg',
  '/renders/RENDER-23.jpg', '/renders/RENDER-24.jpg', '/renders/RENDER-25.jpg',
];

export const FEAR_STATS = [
  { stat: '₦150k+', label: 'Average amount real estate developers in Lagos & Abuja pay for a single interior view. Render skills = instant cash flow.', icon: '📈' },
  { stat: '100x', label: 'Minimum ROI. Pay a tiny one-time fee of ₦15,000 today, and receive ₦200,000 in guaranteed freelance projects.', icon: '💸' },
  { stat: '24/7', label: 'Team support on WhatsApp. Stuck on a render, texture, or model crash? Our mentors fix it with you in real-time.', icon: '🤝' },
  { stat: '15 Days', label: 'From opening AutoCAD for the first time to exporting magazine-quality 3D renders that close clients.', icon: '⏳' },
];

/* ─── LOGO ─── */
export const Logo = () => (
  <div className="flex flex-col items-center text-center cursor-pointer group" onClick={() => window.location.href = '/'}>
    <span className="font-display font-bold text-lg tracking-tight leading-none text-slate-900 whitespace-nowrap">Avada</span>
    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange-500 whitespace-nowrap mt-1">Design</span>
  </div>
);

/* ─── FLIP CLOCK ─── */
const FlipDigit = ({ value }: { value: string }) => (
  <div className="flip-digit-wrapper"><div className="flip-digit"><span>{value}</span></div></div>
);

/* ─── CTA WIDGET ─── */
export const CallToActionWidget = ({ timeLeft, onClick, headline, subtext }: { timeLeft: { h: number; m: number; s: number }; onClick: () => void; headline?: string; subtext?: string }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const h = f(timeLeft.h), m = f(timeLeft.m), s = f(timeLeft.s);
  return (
    <div className="relative py-12 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {headline && <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tight">{headline}</h3>}
        {subtext && <p className="text-zinc-400 text-sm mb-6">{subtext}</p>}
        {!headline && <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">🚨 PORTFOLIO BUILDER CLOSING SOON. SECURE YOUR SPOT NOW.</p>}
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-6">
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={h[0]} /><FlipDigit value={h[1]} /></div><span className="flip-clock-label">HRS</span></div>
          <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={m[0]} /><FlipDigit value={m[1]} /></div><span className="flip-clock-label">MIN</span></div>
          <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
          <div className="flip-clock-group"><div className="flex gap-1"><FlipDigit value={s[0]} /><FlipDigit value={s[1]} /></div><span className="flip-clock-label">SEC</span></div>
        </div>
        <div className="mb-6">
          <p className="text-orange-400 font-bold text-sm mt-2">AutoCAD (Blueprint) + SketchUp (3D Model) + V-Ray & D5 Render AI (Realism) — Lifetime Access</p>
        </div>
        <div className="w-full max-w-md mx-auto">
          <button onClick={onClick} className="cta-primary w-full text-white px-8 py-4 md:py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.98] premium-stroke" style={{ background: 'linear-gradient(135deg, #f7a440 0%, #f7931e 100%)', boxShadow: '0 6px 20px -4px rgba(247,164,68,0.5), 0 12px 40px -8px rgba(247,147,30,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="text-lg md:text-xl font-display font-bold uppercase tracking-widest relative z-10">CLAIM YOUR SPOT NOW</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
          <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-orange-500" /> 7-Day Refund Guarantee</div>
          <div className="w-[1px] h-3 bg-zinc-500"></div>
          <div className="flex items-center gap-1.5"><Zap size={14} className="text-orange-500" /> Instant Setup</div>
          <div className="w-[1px] h-3 bg-zinc-500 hidden sm:block"></div>
          <div className="hidden sm:flex items-center gap-1.5"><Users size={14} className="text-orange-500" /> All Softwares Provided</div>
        </div>
      </div>
    </div>
  );
};

/* ─── SOCIAL PROOF TOAST ─── */
export const SocialProofToast: React.FC = () => {
  const { country } = useCountry();
  const joiners = getJoiners(country);
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const show = () => { setVisible(true); setTimeout(() => { setVisible(false); setTimeout(() => setIdx(p => (p + 1) % joiners.length), 400); }, 2500); };
    const t1 = setTimeout(show, 8000);
    const t2 = setInterval(show, 22000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [joiners.length]);
  const j = joiners[idx];
  return (
    <div className={`fixed bottom-20 left-3 z-[70] transition-all duration-400 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-full px-3 py-1.5 shadow-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 animate-pulse"></span>
        <p className="text-[11px] font-medium text-slate-600 whitespace-nowrap"><span className="font-bold text-slate-800">{j.name}</span> from {j.city} just enrolled</p>
      </div>
    </div>
  );
};

/* ─── CONSTANTS ─── */
export function getValueStackItems(c: CountryConfig) {
  return [
    { name: 'AutoCAD 2D Drafting — Complete Blueprint Course', value: 'Included' },
    { name: 'SketchUp 3D Modeling — Complete Structure Course', value: 'Included' },
    { name: 'V-Ray Photo-Realism Masterclass (Lighting & Textures)', value: 'Included' },
    { name: 'D5 Real-Time AI Rendering Masterclass', value: 'Included' },
    { name: `Guaranteed Freelance Projects (We pay you directly)`, value: c.freelanceTotal },
    { name: '10,000+ Pro HDRI & High-End Texture Library', value: 'Included' },
    { name: '2,000+ Ready-To-Use 3D Modern Furniture Models', value: 'Included' },
    { name: 'Pre-activated Software Setup Guide (AutoCAD, SketchUp, V-Ray, D5)', value: 'Included' },
    { name: '24/7 Expert Tutor Support (WhatsApp/Zoom Screen-Share)', value: 'Included' },
    { name: 'Verifiable Digital Certification & Diploma', value: 'Included' },
  ];
}

export function getTestimonialsLanding(c: CountryConfig) {
  const p = c.formattedPrice;
  return [
    { 
      name: c.cities[0]?.name || 'Chinedu O.', 
      role: 'Freelance Designer', 
      location: `${c.cities[0]?.city}, ${c.name}`, 
      content: 'I was charging ₦15,000 for designs and clients kept complaining. After finishing this bundle, I learned V-Ray and D5. My first photorealistic proposal was accepted for ₦350,000! The 24/7 WhatsApp support saved me from rendering errors multiple times.' 
    },
    { 
      name: c.cities[4]?.name || 'Tunde K.', 
      role: 'Senior Architect', 
      location: `${c.cities[4]?.city || c.cities[0]?.city}, ${c.name}`, 
      content: `Our firm was losing Lekki developers to foreign agencies because of visual quality. We trained our staff using this AutoCAD to D5 Render pipeline. Best ₦15,000 we ever spent — we recently signed a ₦4.2 Million interior/exterior contract.` 
    },
    { 
      name: c.cities[5]?.name || 'Ngozi I.', 
      role: '3D Visualizer', 
      location: `${c.cities[5]?.city || c.cities[0]?.city}, ${c.name}`, 
      content: `I didn\'t believe I could make back my money. But in my second week of learning, the team sent me one of the guaranteed freelance renders and paid me ₦80,000 upon delivery. That\'s more than 5x my entry fee back immediately!` 
    },
    { 
      name: c.cities[8]?.name || 'Obinna C.', 
      role: 'Architecture Student', 
      location: `${c.cities[8]?.city || c.cities[0]?.city}, ${c.name}`, 
      content: 'University taught us theory, not practical business skills. Within 2 weeks of studying this, I started bidding for freelance gigs in Abuja. Now I make more money freelancing in a week than local firms pay junior architects in a month.' 
    },
    { 
      name: c.cities[1]?.name || 'Adaeze N.', 
      role: 'Interior Designer', 
      location: `${c.cities[1]?.city}, ${c.name}`, 
      content: `To have a professional mentor look at your screen via WhatsApp and troubleshoot AutoCAD or V-Ray crashes is priceless. This course took away all my fear of AI replacing me. Now I design faster than ever.` 
    },
    { 
      name: c.cities[2]?.name || 'Emeka A.', 
      role: 'Landscape Architect', 
      location: `${c.cities[2]?.city}, ${c.name}`, 
      content: 'The D5 Render AI course combined with V-Ray is pure magic. I build models in SketchUp and export 4K walkthroughs in D5 in minutes. Real estate agents are amazed by my work.' 
    },
    { 
      name: c.cities[3]?.name || 'Funke B.', 
      role: 'Studio Owner', 
      location: `${c.cities[3]?.city}, ${c.name}`, 
      content: 'No more all-nighters trying to fix lighting. This AutoCAD-to-D5 workflow streamlined our entire studio pipeline. We deliver in 2 days what used to take 2 weeks, and charge premium rates.' 
    },
    { 
      name: c.cities[6]?.name || 'Yusuf M.', 
      role: 'Freelance Visualizer', 
      location: `${c.cities[6]?.city}, ${c.name}`, 
      content: 'I almost quit 3D because physical institutes in Abuja charge ₦250k and teach nothing. This ₦15,000 package taught me how to generate photorealistic finishes, and the community keeps me motivated.' 
    },
    { 
      name: c.cities[7]?.name || 'Blessing E.', 
      role: 'Design Student', 
      location: `${c.cities[7]?.city}, ${c.name}`, 
      content: 'Started from absolute scratch without knowing AutoCAD. The support mentors walked me through the setup. 15 days later, my portfolio had premium-quality interior renders that landed me my first studio gig.' 
    },
    { 
      name: c.cities[9]?.name || 'Amina D.', 
      role: 'Architect', 
      location: `${c.cities[9]?.city || c.cities[1]?.city}, ${c.name}`, 
      content: `If you want to earn premium design fees in Nigeria, you MUST know how to model in SketchUp and render in V-Ray/D5. Don\'t depend on your college degree — learn these practical tools. It is the cheapest career-hack.` 
    },
  ];
}

export function getFaqItemsLanding(c: CountryConfig) {
  const p = c.formattedPrice;
  return [
    { question: `What exactly do I get for ${p}?`, answer: `You get 4 complete professional courses: AutoCAD (2D blueprints), SketchUp Pro (3D structure modeling), V-Ray (photorealistic lighting and textures), and D5 Render AI (cinematic walkthroughs). Plus you get ${c.freelanceTotal} worth of guaranteed freelance projects to recover your cost, 12,000+ textures/furniture libraries, software links, verifiable diploma, and 24/7 WhatsApp expert support. One-time payment for lifetime access.` },
    { question: "Can I do this if I don't have a design background?", answer: "Yes, 80% of our students started with zero knowledge. We teach you from 'how to open the software' to drawing floor plans, extruding 3D walls, adding lighting, and creating the final photorealistic render step-by-step." },
    { question: `Why is this only ${p}? Is there a hidden catch?`, answer: `No catch. We are tired of 'fake gurus' charging ₦200,000+ for outdated lectures. We priced this at a flat ₦15,000 so every ambitious Nigerian architect, student, and freelancer can afford to master these high-income skills without breaking the bank.` },
    { question: "What computer specs do I need? Do I need expensive software?", answer: "Any decent laptop or PC runs these tools. We provide step-by-step installation guides and access to free/student versions of AutoCAD, SketchUp, V-Ray, and D5 Render, so you do not need to buy expensive software licenses." },
    { question: "How do the guaranteed freelance projects work?", answer: `To make sure you get immediate ROI, we provide real client briefs. Once you complete the assignments matching the standards taught in the course, we pay you directly (up to a total of ${c.freelanceTotal}) to add these to your portfolio and build your business confidence.` },
    { question: "Is there a refund if I don't like it?", answer: `Yes, we offer a 100% money-back guarantee within 7 days. If you're not satisfied, send us a message on WhatsApp and we will refund your ${p} immediately. Zero risk, zero questions asked.` }
  ];
}

export function getIncomeTiers(c: CountryConfig) {
  return [
    { label: 'Single Rendering Job', before: 'Can\'t render or model', after: `Charging ${c.renderCharge} per view`, icon: '🖼️' },
    { label: 'Full Design Project', before: 'Price-haggled by cheap clients', after: `Securing ${c.projectRange} projects`, icon: '🏠' },
    { label: 'Rendering Time', before: '3 sleepless nights of crashes', after: '2 Hours with D5 Render AI', icon: '⏱️' },
    { label: 'Financial Security', before: 'Dependant on unstable jobs', after: 'High-earning freelance studio', icon: '💰' },
  ];
}

export const COURSES_LANDING = [
  {
    id: '1', title: 'AutoCAD Mastery', software: 'AutoCAD', students: '42.5k',
    description: 'Draw accurate 2D floor plans and blueprints — the essential starting point for every architectural project.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR',
    learningPoints: ['Draw professional floor plans & furniture layouts', 'Print construction-ready drawings to scale', 'Use shortcuts to draft 10x faster'],
    workflowImpact: 'Create professional blueprints that contractors can actually build from.'
  },
  {
    id: '3', title: 'SketchUp 3D', software: 'SketchUp', students: '55k',
    description: 'Build stunning 3D models from scratch — walls, furniture, kitchens, bathrooms. The foundation of every great render starts here.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo',
    learningPoints: ['Build complete 3D interiors from a blank canvas', 'Apply textures, materials & furniture with confidence', 'Export professional scenes ready for V-Ray & D5 Render'],
    workflowImpact: 'See your imagination come to life in 3D — no experience needed.'
  },
  {
    id: '5', title: 'V-Ray Realism', software: 'V-Ray', students: '48k',
    description: 'Transform your SketchUp models into jaw-dropping photorealistic images. The industry standard for beauty shots that close deals.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    learningPoints: ['Master realistic sunlight, night lighting & shadows', 'Create materials that look like real wood, glass & stone', 'Produce magazine-quality images that sell projects'],
    workflowImpact: 'Watch clients gasp when they see their future home in photorealistic detail.'
  },
  {
    id: '7', title: 'D5 Render AI', software: 'D5 Render', students: '19k',
    description: 'AI-powered real-time rendering. See your changes instantly. Generate 4K images in seconds. The future of architectural visualization.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr',
    learningPoints: ['Real-time rendering — see changes as you make them', 'AI-assisted lighting, materials & scene composition', 'Create cinematic 4K images & video walkthroughs in seconds'],
    workflowImpact: 'Make live design changes while the client watches — mind blown every time.'
  },
];
