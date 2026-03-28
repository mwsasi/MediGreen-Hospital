import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Award, Heart, Target, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-emerald-900">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/hospital-about/1920/1080" 
            alt="Hospital" 
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
            Pioneering <span className="text-emerald-400 italic">Healthcare</span> Excellence.
          </motion.h1>
          <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Since 1995, MediGreen has been at the forefront of medical innovation, providing compassionate care to millions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[48px] border border-emerald-50 shadow-xl space-y-6">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-emerald-950">Our Mission</h2>
            <p className="text-gray-500 leading-relaxed">
              To provide accessible, high-quality healthcare that enhances the quality of life for our patients and the community through innovation, education, and compassionate service.
            </p>
          </div>
          <div className="bg-emerald-600 p-12 rounded-[48px] text-white space-y-6 shadow-2xl shadow-emerald-200">
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-black">Our Vision</h2>
            <p className="text-emerald-50 leading-relaxed">
              To be the global leader in patient-centered healthcare, recognized for our clinical excellence, cutting-edge research, and commitment to a healthier future for all.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our Principles</p>
          <h2 className="text-4xl font-black text-emerald-950">Values That Drive Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Compassion', desc: 'We treat every patient with the same care and respect we would give our own family.' },
            { icon: Shield, title: 'Integrity', desc: 'We uphold the highest ethical standards in all our medical and business practices.' },
            { icon: Award, title: 'Excellence', desc: 'We strive for the best outcomes through continuous learning and technological advancement.' }
          ].map((value, i) => (
            <div key={i} className="text-center space-y-4 p-8">
              <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <value.icon className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-emerald-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-emerald-950 leading-tight">
                A Legacy of Trust and <br />
                <span className="text-emerald-600 italic font-serif">Medical Innovation.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our hospital is home to over 150 specialists and 500 nursing staff, all working together to provide seamless care. We are proud to be JCI accredited and consistently ranked among the top hospitals in the region.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                  <p className="text-4xl font-black text-emerald-600">25+</p>
                  <p className="text-sm font-bold text-gray-400 uppercase">Years of Service</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                  <p className="text-4xl font-black text-emerald-600">100%</p>
                  <p className="text-sm font-bold text-gray-400 uppercase">Patient Safety</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/team/1200/1000" 
                  alt="Medical Team" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-emerald-50 flex items-center space-x-4">
                <div className="bg-emerald-600 p-3 rounded-2xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-950">150+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase">Specialists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
