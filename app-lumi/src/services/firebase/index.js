import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrE08uGOeC_3jqssX5_ejTty74XCy8osU",
  authDomain: "lumiapp-eaec6.firebaseapp.com",
  projectId: "lumiapp-eaec6",
  storageBucket: "lumiapp-eaec6.firebasestorage.app",
  messagingSenderId: "456135548707",
  appId: "1:456135548707:web:64d2c97bd72241ad8e7696",
  measurementId: "G-WN8QRYDLQ3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços e os exporta para usar no resto do app
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;