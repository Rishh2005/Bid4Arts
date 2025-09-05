import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

console.log("Sign-in script loaded");

const firebaseConfig = {
  apiKey: "AIzaSyAJJSz7zl-SOQAApNjDCEib4LjkCFADbKo",
  authDomain: "bids4arts.firebaseapp.com",
  projectId: "bids4arts",
  storageBucket: "bids4arts.firebasestorage.app",
  messagingSenderId: "532608914231",
  appId: "1:532608914231:web:2fc276444c79b48c7f40b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showMessage(msg, color = "red") {
  const messageElem = document.getElementById("message");
  messageElem.style.color = color;
  messageElem.innerText = msg;
}

function highlightInput(inputId, hasError = true) {
  const input = document.getElementById(inputId);
  input.style.border = hasError ? "2px solid red" : "2px solid var(--brown-200)";
}

const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  highlightInput("email", false);
  highlightInput("password", false);
  showMessage("");

  if (!email) {
    showMessage("Email cannot be empty.");
    highlightInput("email");
    return;
  }
  if (!password) {
    showMessage("Password cannot be empty.");
    highlightInput("password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    showMessage("Sign-in successful! Redirecting...", "green");
    setTimeout(() => { window.location.href = "home.html"; }, 1500);
  })
  .catch((error) => {
    let msg;
    if (error.code === "auth/invalid-credential") {
      msg = "Invalid Credentials.";
      highlightInput("email");
      highlightInput("password");
    }
    else if (error.code === "auth/wrong-password") {
      msg = "Incorrect password.";
      highlightInput("password");
    }
    else if (error.code === "auth/invalid-email") {
      msg = "Invalid email address.";
      highlightInput("email");
    }
    else if (error.code === "auth/too-many-requests") {
      msg = "Too many failed login attempts. Please try again later.";
    }
    else {
      msg = error.message;
    }
    showMessage(msg);
  });

});

function socialSignIn(provider, successMsg) {
  showMessage("");
  signInWithPopup(auth, provider)
    .then((result) => {
      showMessage(successMsg + " Redirecting...", "green");
      setTimeout(() => { window.location.href = "home.html"; }, 1500);
    })
    .catch((error) => {
      if (error.code === "auth/popup-closed-by-user") {
        showMessage("Popup closed before completing sign-in.");
      } else if (error.code === "auth/cancelled-popup-request") {
        showMessage("Sign-in popup was cancelled.");
      } else {
        showMessage(error.message);
      }
    });
}

document.getElementById("googleSignin").addEventListener("click", () => {
  socialSignIn(new GoogleAuthProvider(), "Google sign-in successful!");
});

