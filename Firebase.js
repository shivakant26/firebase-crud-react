
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMg_btslvzIwzeDdmVMuxMkzHg6XMXCzg",
  authDomain: "fir-sdm-72f57.firebaseapp.com",
  projectId: "fir-sdm-72f57",
  storageBucket: "fir-sdm-72f57.appspot.com",
  messagingSenderId: "40459524343",
  appId: "1:40459524343:web:1bb270b364bb5e757adbf2",
  measurementId: "G-9WMZVWY4EF",
  baseUrl : "https://fir-sdm-72f57-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);