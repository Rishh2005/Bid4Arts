import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  OAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

console.log("script loaded");

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
const artistSignupBtn = document.getElementById("artistSignup");
const buyerSignupBtn = document.getElementById("buyerSignup");

let selectedRole = null;

function showMessage(msg, color = "red") {
  const messageElem = document.getElementById("message");
  messageElem.style.color = color;
  messageElem.innerText = msg;
}

function highlightInput(inputId, hasError = true) {
  const input = document.getElementById(inputId);
  if (hasError) {
    input.style.border = "2px solid red";
  } else {
    input.style.border = "1px solid #ccc";
  }
}

artistSignupBtn.addEventListener("click", () => {
  selectedRole = "artist";
  artistSignupBtn.classList.add("selected");
  buyerSignupBtn.classList.remove("selected");
});

buyerSignupBtn.addEventListener("click", () => {
  selectedRole = "buyer";
  buyerSignupBtn.classList.add("selected");
  artistSignupBtn.classList.remove("selected");
});

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  ["username", "email", "password", "confirmPassword"].forEach((id) =>
    highlightInput(id, false)
  );
  showMessage("");

  if (username === "") {
    showMessage("Username cannot be empty.");
    highlightInput("username");
    return;
  }

   if (!selectedRole) {
    showMessage("Please select whether you want to sign up an Artist or a Buyer.");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    showMessage("Please enter a valid Gmail address.");
    highlightInput("email");
    return;
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordPattern.test(password)) {
    showMessage(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    );
    highlightInput("password");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.");
    highlightInput("confirmPassword");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return updateProfile(userCredential.user, { displayName: username });
    })
    .then(() => {
      showMessage("Signup successful! Redirecting...", "green");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    })
    .catch((error) => {
      let msg;
      if (error.code === "auth/email-already-in-use") {
        msg = "This email is already registered.";
        highlightInput("email");
      } else if (error.code === "auth/invalid-email") {
        msg = "Invalid email format.";
        highlightInput("email");
      } else if (error.code === "auth/weak-password") {
        msg = "Password is too weak.";
        highlightInput("password");
      } else {
        msg = error.message;
      }
      showMessage(msg);
    });
});

function socialSignIn(provider, successMsg) {
  showMessage(""); 
  signInWithPopup(auth, provider)
    .then(() => {
      showMessage(successMsg + " Redirecting...", "green");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
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

document.getElementById("googleSignup").addEventListener("click", () => {
  socialSignIn(new GoogleAuthProvider(), "Google signup successful!");
});
