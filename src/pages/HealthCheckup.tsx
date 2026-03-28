import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HEALTH_PACKAGES } from '../constants';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Activity,
  Heart,
  Stethoscope
} from 'lucide-react';

export const HealthCheckup: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://picsum.photos/seed/checkup-hero/1920/1080" 
            alt="Health Checkup" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white"
          >
            Preventive <span className="text-emerald-400 italic">Health</span> Checkups.
          </motion.h1>
          <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Early detection is the key to a long and healthy life. Choose from our specialized screening packages.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {HEALTH_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[48px] overflow-hidden border border-emerald-50 hover:border-emerald-200 hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-emerald-600 text-white px-6 py-2 rounded-2xl font-black text-xl shadow-lg">
                  {pkg.price}
                </div>
              </div>
              
              <div className="p-10 space-y-8 flex-grow flex flex-col">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-emerald-950">{pkg.name}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-4 flex-grow">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Tests Included:</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-emerald-50">
                  <Link 
                    to="/doctors"
                    className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 group/btn"
                  >
                    Book Package
                    <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-emerald-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Why Preventive Care?</p>
            <h2 className="text-4xl font-black text-emerald-950">Better Safe Than Sorry</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Early Detection', desc: 'Identify potential health issues before they become serious problems.' },
              { icon: Clock, title: 'Quick Results', desc: 'Get your comprehensive health reports within 24-48 hours.' },
              { icon: Stethoscope, title: 'Expert Advice', desc: 'Every package includes a detailed consultation with our specialists.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-emerald-100 shadow-sm space-y-6 text-center">
                <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <item.icon className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-emerald-950 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'How should I prepare for my checkup?', a: 'Most packages require 8-10 hours of fasting. We recommend wearing comfortable clothing and bringing your previous medical records.' },
            { q: 'When will I get my reports?', a: 'Reports are typically available on your patient dashboard within 24 hours of the tests.' },
            { q: 'Can I customize my package?', a: 'Yes, you can add specific tests to any package after consulting with our medical coordinator.' }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-emerald-50 shadow-sm space-y-3">
              <h4 className="text-lg font-bold text-emerald-900">{faq.q}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
