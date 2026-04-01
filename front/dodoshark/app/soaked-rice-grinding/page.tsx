import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soaked Rice High-efficiency Grinding Solution | DoDoShark',
  description: 'Specialized wet milling for soaked rice products. 304 SS construction, air-cooling, and non-clogging technology.',
}

function SectionHeader({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) {
  return (
    <div className="mb-16 text-center md:mb-24">
      {label && (
        <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
          <span className="h-[1px] w-8 bg-blue-600/30" />
          {label}
          <span className="h-[1px] w-8 bg-blue-600/30" />
        </div>
      )}
      <h2 className="text-4xl font-display font-black leading-tight tracking-tight text-slate-900 md:text-6xl mb-6">
        {title}
      </h2>
      {subtitle && <p className="text-xl text-slate-500 max-w-4xl mx-auto font-light leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export default function SoakedRiceSolutionPage() {
  return (
    <main className="bg-[#fcfdfd] text-slate-900">
      {/* 1. Hero / Overview Section */}
      <section className="relative overflow-hidden bg-[#0a0f1a] pb-32 pt-40 lg:pt-48 lg:pb-40 text-white">
        {/* Dynamic Mesh Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 backdrop-blur-md">
              <i className="fas fa-water animate-pulse" />
              <span>Wet Milling Specialist</span>
            </div>
            <h1 className="mb-8 text-5xl font-display font-black leading-[1.1] tracking-tighter text-white md:text-7xl lg:text-8xl italic">
              Dodoshark <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 not-italic">Soaked Rice</span> Solution
            </h1>
            <p className="mb-12 text-xl font-light leading-relaxed text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Specifically tailored for the high-efficiency milling of soaked rice (wet rice). Addressing clogging, screen fouling, and low throughput while ensuring food-grade hygiene standards.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <a href="#products" className="group relative overflow-hidden rounded-xl bg-blue-600 px-10 py-5 text-sm font-black tracking-[0.2em] text-white shadow-2xl shadow-blue-500/40 transition-all hover:-translate-y-1 hover:shadow-blue-500/60 active:translate-y-0">
                <span className="relative z-10">EXPLORE WET MILLS</span>
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
              
              <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-3xl border border-white/10 bg-slate-900">
                <Image src="/assets/images/solutions/temp/soaked-rice.jpg" alt="Soaked Rice Grinding Solution" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/90 via-transparent to-transparent" />
                
                {/* Floating Glassmorphism Stats */}
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-end gap-3 mb-2">
                       <div className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-blue-400 italic leading-none">3.0</div>
                       <div className="text-xl font-black text-blue-400 mb-2 uppercase tracking-widest border-b-2 border-blue-500/50 pb-1">T/h</div>
                    </div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Peak Production Capacity</div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                       <div>
                          <div className="text-white font-bold text-sm">Industrial Grade</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Classification</div>
                       </div>
                       <div>
                          <div className="text-white font-bold text-sm">Non-Clogging</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Tech Standard</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Advantages */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Why Choose Us"
            title="Core Advantages"
            subtitle="Engineered for stability, hygiene, and high-volume wet processing. Our technology sets the benchmark for soaked rice milling."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <AdvantageCard 
              icon="tint-slash" 
              title="Anti-Clogging Design" 
              desc="Widened chamber structure prevents wet powder sticking and screen fouling for continuous production." 
              img="/assets/images/solutions/temp/high-efficiency-stable-durable.png"
            />
            <AdvantageCard 
              icon="snowflake" 
              title="Advanced Cooling" 
              desc="High-volume air-cooling system maintains low temperatures to prevent starch gelatinization." 
              img="/assets/images/solutions/temp/clean-workshop.png"
            />
            <AdvantageCard 
              icon="gem" 
              title="Rice Flour Quality" 
              desc="Selectable mesh sizes (0.4–0.8 mm) produce delicate 80–120 mesh flour for premium rice products." 
              img="/assets/images/solutions/temp/rice-flour-excellent-quality.png"
            />
            <AdvantageCard 
              icon="bolt" 
              title="Efficiency Boost" 
              desc="Hourly output exceeding 3 tonnes per unit, delivering a 300% increase in processing efficiency." 
              img="/assets/images/solutions/temp/low-cost-high-roi.png"
            />
            <AdvantageCard 
              icon="robot" 
              title="Intelligent & Worry-Free" 
              desc="Food-grade fully dust-free design covering the entire process from feeding to collection." 
              img="/assets/images/solutions/temp/intelligent-worry-free.png"
            />
            <AdvantageCard 
              icon="shield-check" 
              title="Long-Term Guarantee" 
              desc="Stainless steel construction ensures hygiene compliance and long-term durability in wet environments." 
              img="/assets/images/solutions/temp/long-term-guarantee.png"
            />
          </div>
        </div>
      </section>

      {/* 3. Materials Information */}
      <section className="py-32 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:48px_48px] opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/2">
              <div className="mb-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                <span className="h-px w-8 bg-blue-600" />
                Material Analysis
              </div>
              <h2 className="text-4xl font-display font-black leading-tight mb-8 text-slate-900 md:text-5xl">Soaked Rice Characteristics</h2>
              <p className="text-slate-500 mb-12 font-light leading-relaxed text-lg max-w-xl">
                Soaked rice presents unique challenges due to its high moisture content. Conventional mills often fail due to these critical factors:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <CharacteristicItem title="Wet Stickiness" desc="Moist powder tends to adhere to internal walls and screen surfaces." icon="faucet-drip" />
                 <CharacteristicItem title="Heat Sensitivity" desc="Friction heat can cause starch gelatinization, ruining the texture." icon="temperature-high" />
                 <CharacteristicItem title="Hygiene Risks" desc="Wet environments promote bacterial growth if not properly cleaned." icon="hand-sparkles" />
                 <CharacteristicItem title="Throughput Drop" desc="Clogging causes frequent downtime and low effective capacity." icon="chart-line-down" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:sticky lg:top-32">
               <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-3xl shadow-slate-900/20">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <i className="fas fa-microchip text-9xl rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-display font-black leading-tight mb-10">Application Scenarios</h2>
                    <div className="space-y-8">
                       <AppTag title="Rice Cakes & Noodles" desc="Requires high-moisture milling with ultra-fine mesh." icon="utensils" />
                       <AppTag title="Tangyuan Flour" desc="Fine particles ranging from 100 to 120 mesh." icon="bowl-rice" />
                       <AppTag title="Vermicelli Production" desc="Industrial-scale output with consistent particle size." icon="wave-square" />
                    </div>
                    <div className="mt-16 pt-10 border-t border-white/10 flex items-center gap-8">
                       <div className="shrink-0">
                          <div className="text-6xl font-black text-blue-400 italic leading-none">60-80</div>
                          <div className="text-[10px] font-black uppercase text-white/40 tracking-[0.3em] mt-3">Mesh Standard</div>
                       </div>
                       <div className="text-slate-400 text-sm leading-relaxed border-l border-white/10 pl-8 font-light italic">
                         "Consistent high-efficiency processing for wet powder across all major rice products."
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pain Points Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            label="Problem Solving"
            title="Industry Pain Points" 
            subtitle="Wet processing used to be a bottleneck. Experience the Dodoshark difference where we turn challenges into competitive advantages." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PainPointCard
              title="产能低下 (Low Capacity)"
              desc="Frequent clogging leading to low throughput and high labor costs."
              solution="Widened chamber + High-pressure air-cooling."
              img="/assets/images/solutions/temp/low-capacity.jpg"
              icon="clock-rotate-left"
            />
            <PainPointCard
              title="筛网易堵塞 (Screen Clogging)"
              desc="Wet rice powder sticks to the mesh, blocking discharge."
              solution="Self-cleaning vortex airflow design."
              img="/assets/images/solutions/temp/screen-clogging.jpg"
              icon="filter-circle-xmark"
            />
            <PainPointCard
              title="淀粉糊化 (Gelatinization)"
              desc="Overheating during milling ruins the rice flour quality."
              solution="Active cooling modules keep temp < 40°C."
              img="/assets/images/solutions/temp/starch-gelatinization.jpg"
              icon="fire-flame-simple"
            />
            <PainPointCard
              title="Serious Dust Pollution"
              desc="Workshop hygiene issues due to leaking steam and powder."
              solution="Fully enclosed dust-free collection system."
              img="/assets/images/solutions/temp/serious-dust-pollution.jpg"
              icon="wind"
            />
          </div>
        </div>
      </section>

      {/* 5. Product Portfolio */}
      <section id="products" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            label="Equipment Selection"
            title="Wet Milling Portfolio" 
            subtitle="Precision-engineered configurations designed to match your specific production scale and fineness requirements." 
          />
          <div className="space-y-24">
            <ProductDisplay 
              num="01"
              title="Stainless Steel Soaked Rice Mill (304 SS)"
              desc="The standard for food-grade wet processing with full anti-clogging technology."
              img="/assets/images/solutions/temp/dodoshark-304-ss-claw-mill-with-fan.png"
              specs={{ "Fineness": "0.4 - 0.8 mm (80-120 Mesh)", "Capacity": "800 kg - 3 t/h", "Power": "18.5 - 75 kW", "Hygiene": "Food Grade 304" }}
            />
            <ProductDisplay 
              num="02"
              title="High-Pressure Centrifugal Air-Cooled Mill"
              desc="Optimized for large-scale rice noodle factories needing continuous 12-hour cooling."
              img="/assets/images/solutions/temp/dodoshark-304-ss-claw-mill-no-fan.png"
              specs={{ "Fineness": "Adjustable Mesh", "Cooling": "High-Volume Fan", "Material": "Stainless Steel", "Feeding": "Self-priming" }}
              reverse
            />
          </div>
        </div>
      </section>

      {/* 6. Success Case */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Proven Results" title="Success Story" />
          
          <div className="group relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-3xl bg-slate-900">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-[60%] p-12 lg:p-20 text-white">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400">
                       <i className="fas fa-location-dot" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Anhui Province Project</div>
                       <div className="text-xl font-bold">Anhui Gongting Food Factory</div>
                    </div>
                 </div>
                 
                 <h3 className="text-4xl font-display font-black mb-10 leading-tight lg:text-5xl">Revolutionizing Wet Glutinous Rice Production</h3>
                 
                 <div className="space-y-8 text-slate-400">
                    <div className="flex gap-6">
                       <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                       <p className="text-sm font-light leading-relaxed"><strong className="text-white block mb-1 uppercase tracking-widest text-[10px]">Requirement</strong> Grinding of soaked glutinous rice, 0.6–0.8 mm screen mesh, needing 800 kg/hour for stable production without downtime.</p>
                    </div>
                    <div className="flex gap-6">
                       <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                       <p className="text-sm font-light leading-relaxed"><strong className="text-white block mb-1 uppercase tracking-widest text-[10px]">Solution</strong> DoDoShark 304 Stainless Steel Grinder (60 Wide) + 18.5 kW motor + High-pressure centrifugal fan + Self-priming feed system.</p>
                    </div>
                 </div>
              </div>
              
              <div className="md:w-[40%] bg-blue-600 p-12 lg:p-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
                 <div className="relative z-10">
                    <div className="text-[120px] lg:text-[160px] font-black text-white italic leading-none tracking-tighter opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">3X</div>
                    <div className="text-8xl lg:text-9xl font-black text-white italic leading-none drop-shadow-2xl">3X</div>
                    <div className="text-white font-black text-2xl mt-4 leading-tight uppercase tracking-widest">Efficiency<br/>Increase</div>
                    <p className="text-blue-100 text-sm mt-8 max-w-[280px] font-light leading-relaxed">Achieved consistent grinding without sticking, ensuring food-grade hygiene and threefold productivity improvement.</p>
                    <div className="mt-12 bg-white text-blue-600 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Successful Handover</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function AdvantageCard({ icon, title, desc, img }: any) {
  return (
    <div className="group relative rounded-3xl border border-slate-100 bg-slate-50/50 p-10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-3xl hover:shadow-blue-500/10">
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-transform duration-500 group-hover:rotate-12">
          <i className={`fas fa-${icon} text-2xl`} />
        </div>
        
        <h3 className="mb-4 text-2xl font-display font-bold text-slate-900">{title}</h3>
        <p className="mb-10 text-slate-500 font-light leading-relaxed">{desc}</p>
        
        <div className="relative h-48 w-full overflow-hidden rounded-2xl grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105">
          <Image src={img} alt={title} fill className="object-contain" />
          <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function CharacteristicItem({ title, desc, icon }: any) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5">
       <div className="mb-4 text-blue-600 opacity-30 group-hover:opacity-100 transition-opacity">
          <i className={`fas fa-${icon} text-xl`} />
       </div>
       <h5 className="font-bold text-slate-900 text-base mb-2">{title}</h5>
       <p className="text-slate-500 text-xs font-light leading-relaxed">{desc}</p>
    </div>
  )
}

function AppTag({ title, desc, icon }: any) {
  return (
    <div className="flex items-start gap-6 group">
       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <i className={`fas fa-${icon}`} />
       </div>
       <div>
          <h5 className="font-bold text-blue-100 text-base mb-1 group-hover:text-white transition-colors">{title}</h5>
          <p className="text-slate-400 text-sm font-light leading-relaxed group-hover:text-slate-300 transition-colors">{desc}</p>
       </div>
    </div>
  )
}

function PainPointCard({ title, desc, solution, img, icon }: any) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-3xl hover:shadow-blue-500/10">
      <div className="relative h-48 w-full overflow-hidden">
         <Image src={img} alt={title} fill className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
         <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
         <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 text-white backdrop-blur-sm shadow-lg">
            <i className={`fas fa-${icon} text-sm`} />
         </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h4 className="font-bold text-slate-900 mb-2 text-lg">{title}</h4>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-light">{desc}</p>
        
        <div className="mt-auto rounded-xl bg-blue-50 p-4 border border-blue-100/50">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Dodoshark Solution</span>
          </div>
          <p className="text-xs text-slate-800 font-bold leading-tight">{solution}</p>
        </div>
      </div>
    </div>
  )
}

function ProductDisplay({ num, title, desc, specs, img, reverse = false }: any) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${reverse ? 'lg:flex-row-reverse' : ''} group`}>
      <div className="lg:w-1/2 relative">
        {/* Decorative background for image */}
        <div className="absolute -inset-10 bg-blue-600/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden bg-white border border-slate-100 shadow-2xl transition-transform duration-700 group-hover:scale-105">
          <Image src={img} alt={title} fill className="object-contain p-12 transition-transform duration-700 group-hover:rotate-3" />
        </div>
      </div>
      
      <div className="lg:w-1/2">
        <div className="inline-flex items-center gap-3 mb-6">
           <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20">{num}</div>
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Premium Solution</span>
        </div>
        
        <h3 className="text-4xl font-display font-black mb-6 text-slate-900 leading-tight">{title}</h3>
        <p className="text-slate-500 font-light mb-12 leading-relaxed text-lg border-l-2 border-blue-500/20 pl-6 italic">"{desc}"</p>
        
        <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-12 pt-10 border-t border-slate-100">
          {Object.entries(specs).map(([k, v]: any) => (
            <div key={k} className="group/item">
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2 group-hover/item:text-blue-500 transition-colors">{k}</span>
              <span className="text-xl font-bold text-slate-800">{v}</span>
            </div>
          ))}
        </div>
        
        <Link href="/products" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20 active:translate-y-1">
          VIEW SPECIFICATIONS <i className="fas fa-arrow-right animate-bounce-x" />
        </Link>
      </div>
    </div>
  )
}
