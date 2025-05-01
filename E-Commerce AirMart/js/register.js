import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqmfqsqr1_Vp0YBrbtz2RbrEoN7RDAU_Q",
  authDomain: "airmart-d1fba.firebaseapp.com",
  projectId: "airmart-d1fba",
  storageBucket: "airmart-d1fba.appspot.com",
  messagingSenderId: "539508267039",
  appId: "1:539508267039:web:20d26caa21c96d91205d2a",
  measurementId: "G-NLN5ZB9237"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const signinSubmit = document.getElementById("signin-submit");
const signupSubmit = document.getElementById("signup-submit");

signinSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-user").value;
  const password = document.getElementById("signin-pass").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    alert("Sign in successful!");
    // Redirect or update UI as needed
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Error signing in: " + error.message);
  }
});

signupSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-user").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-pass").value;
  const passwordRepeat = document.getElementById("signup-pass-repeat").value;

  if (!username || !email || !password || !passwordRepeat) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== passwordRepeat) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Store additional user info in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      username: username,
      email: email,
      password: password,
      uid: user.uid,
      createdAt: new Date()
    });
    console.log("User registered successfully:", user);
    alert("User registered successfully!");
    // Optionally switch to sign in tab or redirect
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Error registering user: " + error.message);
  }
});
