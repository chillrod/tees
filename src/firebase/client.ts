import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsf2NntJwZ452R2dNbvTrizhIXAUH7UUc",
  authDomain: "studioestamparcanvas.firebaseapp.com",
  projectId: "studioestamparcanvas",
  storageBucket: "studioestamparcanvas.appspot.com",
  messagingSenderId: "493173877593",
  appId: "1:493173877593:web:2b33b34644acc60126fa48",
  measurementId: "G-6DF9QM3Z69"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
