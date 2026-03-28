import { Doctor } from './types';

export const DEPARTMENTS = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Specialized care for heart and vascular conditions.',
    icon: 'Heart',
    image: 'https://picsum.photos/seed/cardiology/800/600'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Expert treatment for brain and nervous system disorders.',
    icon: 'Brain',
    image: 'https://picsum.photos/seed/neurology/800/600'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Comprehensive healthcare for infants, children, and adolescents.',
    icon: 'Baby',
    image: 'https://picsum.photos/seed/pediatrics/800/600'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Advanced care for bones, joints, and musculoskeletal issues.',
    icon: 'Activity',
    image: 'https://picsum.photos/seed/orthopedics/800/600'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Specialized treatment for skin, hair, and nail conditions.',
    icon: 'Sun',
    image: 'https://picsum.photos/seed/dermatology/800/600'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    description: 'Expert eye care and vision correction services.',
    icon: 'Eye',
    image: 'https://picsum.photos/seed/ophthalmology/800/600'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Sarah Wilson',
    specialty: 'Senior Cardiologist',
    department: 'Cardiology',
    experience: '15+ Years',
    image: 'https://picsum.photos/seed/doctor1/400/400',
    available: true
  },
  {
    id: 'doc2',
    name: 'Dr. James Miller',
    specialty: 'Neurologist',
    department: 'Neurology',
    experience: '12+ Years',
    image: 'https://picsum.photos/seed/doctor2/400/400',
    available: true
  },
  {
    id: 'doc3',
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    experience: '8+ Years',
    image: 'https://picsum.photos/seed/doctor3/400/400',
    available: true
  },
  {
    id: 'doc4',
    name: 'Dr. Robert Brown',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: '20+ Years',
    image: 'https://picsum.photos/seed/doctor4/400/400',
    available: true
  }
];

export const AVAILABLE_TIMES = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export const HEALTH_PACKAGES = [
  {
    id: 'basic-wellness',
    name: 'Basic Wellness Checkup',
    price: '$99',
    description: 'Essential tests for a quick health overview.',
    features: ['Blood Count', 'Blood Sugar', 'Urine Analysis', 'Physical Exam'],
    image: 'https://picsum.photos/seed/wellness/800/600'
  },
  {
    id: 'executive-health',
    name: 'Executive Health Package',
    price: '$299',
    description: 'Comprehensive screening for busy professionals.',
    features: ['Full Blood Profile', 'ECG', 'Chest X-Ray', 'Liver Function', 'Kidney Function'],
    image: 'https://picsum.photos/seed/executive/800/600'
  },
  {
    id: 'cardiac-screening',
    name: 'Cardiac Screening',
    price: '$499',
    description: 'Advanced heart health evaluation.',
    features: ['Echocardiogram', 'Stress Test', 'Lipid Profile', 'Consultation'],
    image: 'https://picsum.photos/seed/cardiac/800/600'
  }
];
