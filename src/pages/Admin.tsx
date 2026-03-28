import React, { useEffect, useState } from 'react';
import { subscribeToAllAppointments, updateAppointmentStatus } from '../services/firestoreService';
import { Appointment } from '../types';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter,
  MoreVertical,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

export const Admin: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsub = subscribeToAllAppointments(setAppointments);
    return () => unsub();
  }, []);

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = async (id: string, status: Appointment['status']) => {
    try {
      await updateAppointmentStatus(id, status);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length, icon: XCircle, color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-emerald-950">Admin Control Center</h1>
        <p className="text-gray-500 font-medium">Manage hospital operations and patient appointments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-emerald-50 shadow-sm space-y-4">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-emerald-950">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[40px] border border-emerald-50 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-emerald-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-emerald-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2 text-sm font-bold text-emerald-900 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50/50 text-left">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-emerald-900 uppercase tracking-wider">Patient</th>
                <th className="px-8 py-4 text-xs font-bold text-emerald-900 uppercase tracking-wider">Doctor</th>
                <th className="px-8 py-4 text-xs font-bold text-emerald-900 uppercase tracking-wider">Date & Time</th>
                <th className="px-8 py-4 text-xs font-bold text-emerald-900 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-emerald-900 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-emerald-50/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                        {apt.patientName[0]}
                      </div>
                      <span className="font-bold text-emerald-950">{apt.patientName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-600 font-medium">{apt.doctorName}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm">
                      <p className="font-bold text-emerald-900">{format(new Date(apt.date), 'MMM dd, yyyy')}</p>
                      <p className="text-gray-400">{apt.time}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      apt.status === 'confirmed' ? 'text-emerald-600 bg-emerald-50' :
                      apt.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <Search className="h-12 w-12 text-emerald-100 mx-auto" />
              <p className="text-gray-400 font-medium">No appointments found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
