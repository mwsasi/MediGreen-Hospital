import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { INITIAL_DOCTORS, AVAILABLE_TIMES } from '../constants';
import { createAppointment } from '../services/firestoreService';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  ArrowLeft,
  CalendarDays,
  ShieldCheck
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

export const AppointmentBooking: React.FC = () => {
  const { doctorId } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const doctor = INITIAL_DOCTORS.find(d => d.id === doctorId);
  
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate next 7 days
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

  const handleBooking = async () => {
    if (!user || !doctor || !selectedTime) return;

    setLoading(true);
    try {
      await createAppointment({
        patientId: user.uid,
        patientName: profile?.displayName || user.email || 'Patient',
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <div>Doctor not found</div>;

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[48px] shadow-2xl border border-emerald-50 text-center space-y-6">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-emerald-950">Booking Successful!</h2>
          <p className="text-gray-500 font-medium">
            Your appointment with {doctor.name} has been requested. You can track the status in your dashboard.
          </p>
          <div className="pt-4">
            <div className="animate-pulse text-emerald-600 font-bold text-sm">Redirecting to dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 font-bold hover:text-emerald-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back to Doctors
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Doctor Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[48px] border border-emerald-50 shadow-xl space-y-6">
            <div className="aspect-square rounded-[32px] overflow-hidden border-4 border-emerald-50">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-emerald-950">{doctor.name}</h2>
              <p className="text-emerald-600 font-bold">{doctor.specialty}</p>
              <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 mr-1 text-emerald-500" />
                Verified Specialist
              </div>
            </div>
            <div className="pt-6 border-t border-emerald-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-bold">Experience</span>
                <span className="text-emerald-900 font-black">{doctor.experience}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-bold">Department</span>
                <span className="text-emerald-900 font-black">{doctor.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-emerald-950 flex items-center">
              <CalendarDays className="mr-3 h-6 w-6 text-emerald-600" />
              Select Date
            </h3>
            <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
              {nextDays.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 w-24 h-32 rounded-3xl flex flex-col items-center justify-center transition-all border-2 ${
                    isSameDay(selectedDate, date)
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200'
                      : 'bg-white border-emerald-50 text-emerald-900 hover:border-emerald-200'
                  }`}
                >
                  <span className="text-xs font-bold uppercase opacity-60 mb-1">{format(date, 'EEE')}</span>
                  <span className="text-2xl font-black">{format(date, 'dd')}</span>
                  <span className="text-[10px] font-bold uppercase mt-1">{format(date, 'MMM')}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-emerald-950 flex items-center">
              <Clock className="mr-3 h-6 w-6 text-emerald-600" />
              Available Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {AVAILABLE_TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                    selectedTime === time
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                      : 'bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-emerald-50">
            <div className="bg-emerald-50 p-6 rounded-3xl mb-8 flex items-start space-x-4">
              <div className="bg-emerald-600 p-2 rounded-xl mt-1">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-black uppercase tracking-widest mb-1">Booking for</p>
                <p className="text-emerald-950 font-bold">{profile?.displayName || user?.email}</p>
                <p className="text-xs text-gray-500 mt-1">Confirmed details will be sent to your email.</p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading || !selectedTime}
              className="w-full bg-emerald-600 text-white py-5 rounded-[32px] font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? "Processing..." : "Confirm Appointment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
