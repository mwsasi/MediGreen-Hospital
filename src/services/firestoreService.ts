import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile, Doctor, Appointment, Report } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

// User Services
export async function createUserProfile(profile: UserProfile) {
  const path = `users/${profile.uid}`;
  try {
    await setDoc(doc(db, 'users', profile.uid), profile);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

// Doctor Services
export async function getDoctors(): Promise<Doctor[]> {
  const path = 'doctors';
  try {
    const querySnapshot = await getDocs(collection(db, 'doctors'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function addDoctor(doctor: Omit<Doctor, 'id'>) {
  const path = 'doctors';
  try {
    await addDoc(collection(db, 'doctors'), doctor);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Appointment Services
export async function createAppointment(appointment: Omit<Appointment, 'id'>) {
  const path = 'appointments';
  try {
    await addDoc(collection(db, 'appointments'), {
      ...appointment,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToUserAppointments(uid: string, callback: (appointments: Appointment[]) => void) {
  const path = 'appointments';
  const q = query(
    collection(db, 'appointments'),
    where('patientId', '==', uid),
    orderBy('date', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
    callback(appointments);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
}

export function subscribeToAllAppointments(callback: (appointments: Appointment[]) => void) {
  const path = 'appointments';
  const q = query(collection(db, 'appointments'), orderBy('date', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
    callback(appointments);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']) {
  const path = `appointments/${id}`;
  try {
    await updateDoc(doc(db, 'appointments', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Report Services
export async function uploadReport(report: Omit<Report, 'id'>) {
  const path = 'reports';
  try {
    await addDoc(collection(db, 'reports'), {
      ...report,
      uploadedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToUserReports(uid: string, callback: (reports: Report[]) => void) {
  const path = 'reports';
  const q = query(
    collection(db, 'reports'),
    where('patientId', '==', uid),
    orderBy('uploadedAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report));
    callback(reports);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
}
