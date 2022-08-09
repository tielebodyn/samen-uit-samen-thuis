const firebaseConfig = {
  apiKey: "AIzaSyBCrJuWgpXrwseJtlM-pDsHMCp6WxkQ0-E",
  authDomain: "samen-uit-samen-thuis-fd23f.firebaseapp.com",
  projectId: "samen-uit-samen-thuis-fd23f",
  storageBucket: "samen-uit-samen-thuis-fd23f.appspot.com",
  messagingSenderId: "907807864854",
  appId: "1:907807864854:web:0a8cbf505e2de7e4651d37"
};

// Initialize Firebase
export const initFirebase = () => {
    firebase.initializeApp(firebaseConfig)
}