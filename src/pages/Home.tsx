import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Calendar,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS, INITIAL_DOCTORS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-emerald-50/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 rounded-l-[100px] transform translate-x-24 -skew-x-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>Trusted Healthcare Partner</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black text-emerald-950 leading-[1.1]">
                Your Health, <br />
                <span className="text-emerald-600 italic font-serif">Our Priority.</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Experience world-class medical care with state-of-the-art technology and compassionate professionals dedicated to your recovery.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/doctors"
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center group"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/departments"
                  className="w-full sm:w-auto bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-emerald-100 hover:border-emerald-200 transition-all flex items-center justify-center"
                >
                  Explore Services
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-emerald-100">
                <div>
                  <p className="text-3xl font-black text-emerald-900">20k+</p>
                  <p className="text-sm text-gray-500 font-medium">Happy Patients</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-emerald-900">150+</p>
                  <p className="text-sm text-gray-500 font-medium">Expert Doctors</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-emerald-900">12+</p>
                  <p className="text-sm text-gray-500 font-medium">Departments</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://picsum.photos/seed/hospital-hero/800/1000"
                  alt="Modern Hospital"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50 z-20 max-w-[240px] animate-bounce-slow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-emerald-100 p-2 rounded-xl">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="font-bold text-emerald-900">Easy Booking</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Book your specialist in less than 2 minutes online.</p>
              </div>

              <div className="absolute top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50 z-20 max-w-[240px] animate-pulse-slow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-100 p-2 rounded-xl">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="font-bold text-emerald-900">Top Rated</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Consistently ranked #1 for patient satisfaction.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our Specialties</p>
            <h2 className="text-4xl font-black text-emerald-950">World Class Departments</h2>
          </div>
          <Link to="/departments" className="text-emerald-600 font-bold flex items-center hover:translate-x-1 transition-transform">
            View All Departments <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.slice(0, 3).map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-[32px] border border-emerald-50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Users className="h-8 w-8 text-emerald-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-4">{dept.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{dept.description}</p>
              <Link to={`/doctors?dept=${dept.id}`} className="inline-flex items-center text-emerald-600 font-bold group/link">
                Find Doctors <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <p className="text-5xl font-black text-white">99%</p>
              <p className="text-emerald-300 font-medium">Success Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-white">500+</p>
              <p className="text-emerald-300 font-medium">Beds Available</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-white">1M+</p>
              <p className="text-emerald-300 font-medium">Lab Tests</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-white">24/7</p>
              <p className="text-emerald-300 font-medium">Emergency Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Checkup Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 rounded-[60px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Preventive Care</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-emerald-950 leading-tight">
              Invest in Your Future with <br />
              <span className="text-emerald-600 italic font-serif">Health Checkups.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Don't wait for symptoms. Our comprehensive health screening packages are designed to detect potential issues early, giving you peace of mind.
            </p>
            <Link 
              to="/health-checkup"
              className="inline-flex items-center bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 group"
            >
              View Packages
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/checkup-home/800/600" 
                alt="Health Checkup" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our Team</p>
          <h2 className="text-4xl font-black text-emerald-950">Meet Our Specialists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INITIAL_DOCTORS.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[40px] overflow-hidden border border-emerald-50 hover:shadow-2xl transition-all group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600">
                  {doctor.experience} Exp
                </div>
              </div>
              <div className="p-6 text-center space-y-2">
                <h3 className="text-xl font-bold text-emerald-950">{doctor.name}</h3>
                <p className="text-emerald-600 font-semibold text-sm">{doctor.specialty}</p>
                <p className="text-gray-400 text-xs">{doctor.department}</p>
                <div className="pt-4">
                  <Link
                    to={`/book/${doctor.id}`}
                    className="block w-full bg-emerald-50 text-emerald-700 py-3 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
