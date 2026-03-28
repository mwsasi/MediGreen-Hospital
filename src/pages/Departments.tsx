import React from 'react';
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from '../constants';
import { 
  Heart, 
  Brain, 
  Baby, 
  Activity, 
  Sun, 
  Eye,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Heart,
  Brain,
  Baby,
  Activity,
  Sun,
  Eye
};

export const Departments: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
            <Activity className="h-4 w-4" />
            <span>Specialized Care Units</span>
          </div>
          <h1 className="text-6xl font-black text-emerald-950 leading-tight">
            Comprehensive <br />
            <span className="text-emerald-600 italic font-serif">Medical Excellence.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
            Our hospital features state-of-the-art departments equipped with the latest technology and staffed by world-renowned experts.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://picsum.photos/seed/dept-hero/1200/800" 
              alt="Hospital Interior" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-8 rounded-[40px] text-white shadow-2xl animate-bounce-slow">
            <p className="text-4xl font-black">12+</p>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">Specialties</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEPARTMENTS.map((dept, index) => {
          const Icon = iconMap[dept.icon] || Activity;
          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[48px] overflow-hidden border border-emerald-50 hover:border-emerald-200 hover:shadow-2xl transition-all"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-emerald-900/20 transition-colors" />
                <div className="absolute top-6 left-6 bg-white p-4 rounded-2xl shadow-lg group-hover:bg-emerald-600 transition-colors">
                  <Icon className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-black text-emerald-950">{dept.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {dept.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <Link 
                    to={`/doctors?dept=${dept.id}`}
                    className="flex items-center text-emerald-600 font-bold group/link"
                  >
                    View Specialists <ChevronRight className="ml-1 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="bg-emerald-950 rounded-[60px] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <h2 className="text-4xl md:text-5xl font-black text-white relative z-10">
          Need Specialized Medical Advice?
        </h2>
        <p className="text-emerald-300 text-lg max-w-2xl mx-auto relative z-10">
          Our experts are ready to help you. Book a consultation today and take the first step towards a healthier life.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link 
            to="/doctors"
            className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
          >
            Find a Doctor
          </Link>
          <Link 
            to="/login"
            className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            Patient Portal
          </Link>
        </div>
      </section>
    </div>
  );
};
