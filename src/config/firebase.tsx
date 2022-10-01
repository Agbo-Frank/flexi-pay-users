import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBztiwgU7AP-dbEUhHzBLykWuHNzd7J5gI",
  authDomain: "flexipay-51bcd.firebaseapp.com",
  projectId: "flexipay-51bcd",
  storageBucket: "flexipay-51bcd.appspot.com",
  messagingSenderId: "628030440967",
  appId: "1:628030440967:web:fd736542a760a5e3ee8ca2",
  measurementId: "G-LCJEQPXNKP"
};

initializeApp(firebaseConfig)

export const fireDB = getFirestore()
export  const contactInfo = collection(fireDB, 'contact_info')

