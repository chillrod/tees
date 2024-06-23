import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkbrpYUyP6Yy5FBZ5osyy-VFho2z7ukyA",
  authDomain: "studiocanvas-d24ec.firebaseapp.com",
  projectId: "studiocanvas-d24ec",
  storageBucket: "studiocanvas-d24ec.appspot.com",
  messagingSenderId: "956015152278",
  appId: "1:956015152278:web:d48ddd6030d5cbcb3b06b7",
  measurementId: "G-DGY115H0VF",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
