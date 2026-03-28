import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { INITIAL_DOCTORS, DEPARTMENTS } from '../constants';
import { Search, Filter, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Doctors: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialDept = searchParams.get('dept') || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState(initialDept);

  const filteredDoctors = INITIAL_DOCTORS.filter(doctor => {
    const matchesDept = selectedDept === 'all' || doctor.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-emerald-950">Our Medical Specialists</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Connect with our world-class team of experienced doctors across various specialties.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-[40px] border border-emerald-50 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-emerald-50/50 border border-emerald-100 rounded-3xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Filter className="h-5 w-5 text-emerald-600 hidden md:block" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full md:w-auto bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-sm font-bold text-emerald-900 outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-[48px] overflow-hidden border border-emerald-50 hover:shadow-2xl transition-all group"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center space-x-2 shadow-lg">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-black text-emerald-950">4.9</span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {doctor.department}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs font-bold">
                    <Clock className="h-3 w-3 mr-1" />
                    {doctor.experience}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-emerald-950">{doctor.name}</h3>
                <p className="text-gray-500 font-medium text-sm">{doctor.specialty}</p>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-400 font-bold">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                  Main Branch
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                  Available Today
                </div>
              </div>

              <Link
                to={`/book/${doctor.id}`}
                className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 group/btn"
              >
                Book Appointment
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-24 space-y-6">
          <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-12 w-12 text-emerald-200" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-emerald-950">No Doctors Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedDept('all'); }}
            className="text-emerald-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
