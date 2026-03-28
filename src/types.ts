export type UserRole = 'patient' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  phone?: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  image: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reminderSent?: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  patientId: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
}
