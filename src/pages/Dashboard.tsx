import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { subscribeToUserAppointments, subscribeToUserReports, uploadReport } from '../services/firestoreService';
import { Appointment, Report } from '../types';
import { 
  Calendar, 
  FileText, 
  Clock, 
  User, 
  Plus, 
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [reportTitle, setReportTitle] = useState('');

  useEffect(() => {
    if (user) {
      const unsubAppointments = subscribeToUserAppointments(user.uid, setAppointments);
      const unsubReports = subscribeToUserReports(user.uid, setReports);
      return () => {
        unsubAppointments();
        unsubReports();
      };
    }
  }, [user]);

  const handleReportUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reportTitle) return;

    setIsUploading(true);
    try {
      // Mock file upload for demo purposes
      const mockFileUrl = `https://example.com/reports/${Date.now()}.pdf`;
      await uploadReport({
        patientId: user.uid,
        title: reportTitle,
        fileUrl: mockFileUrl,
        uploadedAt: new Date().toISOString()
      });
      setReportTitle('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-600 bg-emerald-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-emerald-950">Hello, {profile?.displayName}</h1>
          <p className="text-gray-500 font-medium">Welcome to your patient dashboard.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-2xl border border-emerald-50 shadow-sm flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Upcoming</p>
              <p className="text-sm font-bold text-emerald-900">
                {appointments.filter(a => a.status === 'confirmed').length} Appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-emerald-950 flex items-center">
              <Clock className="mr-3 h-6 w-6 text-emerald-600" />
              Recent Appointments
            </h2>
          </div>

          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="bg-white p-12 rounded-[32px] border border-emerald-50 text-center space-y-4">
                <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-emerald-200" />
                </div>
                <p className="text-gray-500 font-medium">No appointments found.</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="bg-white p-6 rounded-[32px] border border-emerald-50 hover:shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-50 p-4 rounded-2xl">
                      <User className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-950">{apt.doctorName}</h3>
                      <p className="text-sm text-gray-500">{format(new Date(apt.date), 'MMMM dd, yyyy')} at {apt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reports & Upload */}
        <div className="space-y-8">
          <div className="bg-emerald-900 p-8 rounded-[40px] text-white space-y-6 shadow-2xl shadow-emerald-200">
            <h2 className="text-2xl font-bold flex items-center">
              <Upload className="mr-3 h-6 w-6" />
              Upload Report
            </h2>
            <form onSubmit={handleReportUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Report Title (e.g. Blood Test)"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full bg-emerald-800/50 border border-emerald-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-emerald-400"
              />
              <button
                type="submit"
                disabled={isUploading || !reportTitle}
                className="w-full bg-white text-emerald-900 py-3 rounded-2xl font-bold hover:bg-emerald-50 transition-colors disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Submit Report"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-950 flex items-center">
              <FileText className="mr-3 h-6 w-6 text-emerald-600" />
              Medical Reports
            </h2>
            <div className="space-y-4">
              {reports.length === 0 ? (
                <p className="text-gray-400 text-center py-8 italic">No reports uploaded yet.</p>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="bg-white p-4 rounded-2xl border border-emerald-50 flex items-center justify-between group hover:border-emerald-200 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-50 p-2 rounded-xl">
                        <FileText className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-950 text-sm">{report.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{format(new Date(report.uploadedAt), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <a 
                      href={report.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 p-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
