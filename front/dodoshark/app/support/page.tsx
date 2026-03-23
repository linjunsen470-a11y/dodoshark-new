import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service & Support | DoDoShark Machinery',
  description: 'We are your lifelong partner in value co-creation. Discover our comprehensive Pre-Sales, Mid-Sales, and After-Sales support.',
}

const PRE_SALES = [
  {
    title: 'Comprehensive Deep Research',
    description: 'Online/offline communication to accurately organize core needs (materials, capacity, fineness, environmental) and output requirement analysis reports to anchor efficiency indicators.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
    )
  },
  {
    title: 'Customized Process Solutions',
    description: 'Focusing on actual results, we meticulously tailor process technology and equipment configuration step-by-step to clarify and optimize efficiency control points.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
    )
  },
  {
    title: 'Free Trial Optimization',
    description: 'We provide sample testing services to verify efficiency, allowing us to adjust parameter optimization solutions in real time before finalizing your purchase.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    )
  },
  {
    title: 'Transparent Efficiency Calculation',
    description: 'We output clear, actionable data on energy consumption, total yield, and maintenance requirements, using visible benefits to help you make informed decisions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )
  }
]

const MID_SALES = [
  {
    title: 'Equipment Installation & Commissioning',
    text: 'Before leaving the factory, all equipment core components are tested. A fully assembled trial run ensures 12-hour continuous, stable operation, with noise, vibration, and environmental indicators meeting industry standards.'
  },
  {
    title: 'Intelligent Packaging & Transportation',
    text: 'Small equipment is packaged and shipped fully assembled. Large equipment body and accessories are packaged separately for safe transport. We provide comprehensive installation videos for simple on-site assembly.'
  },
  {
    title: 'Technical Handover & Calibration',
    text: 'We deliver a full set of technical documents, including equipment operation manuals, process control checklists, core parameter standards, and customized fault emergency plans.'
  },
  {
    title: '30-Day 24/7 Response Support',
    text: 'Within 30 days of receipt, we provide 24-hour prompt response support for machine installation, testing, configuration, and usage needs to ensure you hit your production targets on time.'
  }
]

export default function SupportPage() {
  return (
    <main className="bg-[#fcfdfd] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
            alt="DoDoShark Engineering Lab"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Service & Support <br /> <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Value Co-Creation</span>
          </h1>
          <p className="text-xl font-bold italic text-orange-300 mb-8 font-serif">
            "We sell not just machinery, but a continuously optimized production result."
          </p>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
            We are more than an equipment supplier; we are your lifelong partner. From initial research to lifelong optimization, our transparent, multi-stage support network ensures your industrial efficiency never drops.
          </p>
        </div>
      </section>

      {/* Pre-Sales Stage */}
      <section className="py-24 bg-white relative z-20 -mt-16 rounded-none md:rounded-t-[1rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-2">Pre-Sales Stage</h2>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Solution Co-Creation <br /> & Professional Sourcing</h3>
            <p className="mt-4 text-slate-500 font-light italic">More than simply selling, we guarantee efficiency targets.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {PRE_SALES.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-8 hover:border-orange-500 transition-all shadow-lg hover:shadow-xl group flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0 w-14 h-14 bg-white border border-slate-100 text-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-3 text-slate-900">{item.title}</h4>
                  <p className="text-slate-600 font-light leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Sales Stage */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-slate-100 rounded-l-[1rem] hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-2">Mid-Sales Stage</h2>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Precise Implementation <br /> & Efficiency Fulfillment</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-10 text-lg italic border-l-4 border-orange-500 pl-4">
                More than installation, it's a seamless transfer of knowledge and technology.
              </p>
              
              <div className="space-y-8">
                {MID_SALES.map((step, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2">{step.title}</h4>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[1rem] overflow-hidden shadow-2xl group border border-slate-200">
                <Image 
                  src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80" 
                  alt="Precision Engineering" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* After-Sales Stage */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">After-Sales Stage</h2>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white">Lifelong Service <br /> & Continuous Optimization</h3>
            <p className="mt-4 text-slate-400 font-light italic">More than warranty, it is full-lifecycle efficiency escort.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 text-orange-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-white">Technical Support & Maintenance</h4>
              <ul className="space-y-3 text-slate-300 font-light text-sm">
                <li className="flex gap-2"><span className="text-orange-500">▶</span> Online consultation & remote guidance for technical problems.</li>
                <li className="flex gap-2"><span className="text-orange-500">▶</span> 3-year warranty on core components with fast logistics for spare parts.</li>
                <li className="flex gap-2"><span className="text-orange-500">▶</span> Professional on-site service by after-sales personnel to minimize impact.</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 text-orange-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-white">Annual Efficiency Review</h4>
              <p className="text-slate-300 font-light text-sm leading-relaxed mb-4">
                We provide annual efficiency reviews for customers, analyzing optimization margins against original presets.
              </p>
              <p className="text-slate-300 font-light text-sm leading-relaxed">
                For needs like capacity expansion, material upgrades, and environmental policy updates, we provide tailored technical transformation and equipment upgrade solutions.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 text-orange-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-white">Partner Empowerment</h4>
              <p className="text-slate-300 font-light text-sm leading-relaxed mb-4">
                We proactively share industry cutting-edge processes, equipment upgrade technologies, and efficiency optimization cases with customers.
              </p>
              <p className="text-slate-300 font-light text-sm leading-relaxed">
                To combat staff turnover, we provide secondary training services ensuring your team's operational capabilities and efficiency control remain perfectly stable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Wrap Up */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">Continuously Accompanying Growth</h2>
          <p className="text-slate-600 font-light text-lg leading-relaxed mb-10">
            Realizing the upgrade from <span className="font-bold text-orange-500">"single equipment service"</span> to <span className="font-bold text-orange-500">"full-lifecycle efficiency empowerment"</span>.
          </p>
          <Link href="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-orange-500/30">
            Request Expert Consultation
          </Link>
        </div>
      </section>

    </main>
  )
}
