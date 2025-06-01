import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Configuração do Firebase
// IMPORTANTE: Substitua estas configurações pelas suas próprias do console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0w85jQA4haKHwc_jHHPKuGYDSqk-GOm4",
  authDomain: "devprofile-lite-55a45.firebaseapp.com",
  projectId: "devprofile-lite-55a45",
  storageBucket: "devprofile-lite-55a45.firebasestorage.app",
  messagingSenderId: "468493389790",
  appId: "1:468493389790:web:14378dfdb8ab0b9d56174f",
  measurementId: "G-LMQ4JFKLYX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar serviços
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
