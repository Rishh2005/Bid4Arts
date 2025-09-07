firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let isSignUp = false;
let selectedRole = "artist";

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to home page
        window.location.href = "pages/home.html";
    }
});

function toggleForm() {
    isSignUp = !isSignUp;

    document.getElementById('ls-form-title').textContent = isSignUp ? 'Sign up as' : 'Sign in to your account';
    document.getElementById('ls-btn-text').textContent = isSignUp ? 'Sign Up' : 'Sign In';
    document.getElementById('ls-role-section').style.display = isSignUp ? 'flex' : 'none';
    document.getElementById('ls-username').parentElement.style.display = isSignUp ? 'block' : 'none';
    document.getElementById('ls-repassword').parentElement.style.display = isSignUp ? 'block' : 'none';
    document.querySelector('.ls-subheading').textContent = isSignUp ? 'Join our creative community' : 'Welcome back to our creative community';
    
    document.querySelector('.ls-switch-text').innerHTML = 
        isSignUp ? 'Already have an account? <span class=\"ls-switch-link\" onclick=\"toggleForm()\">Sign In</span>' 
             : 'Don\'t have an account? <span class=\"ls-switch-link\" onclick=\"toggleForm()\">Sign Up</span>';
}

// Role selection
document.querySelectorAll('.ls-role-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.ls-role-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedRole = this.getAttribute('data-role');
    });
});

// Password visibility toggle
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('ls-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggle-repassword').addEventListener('click', function() {
    const repasswordInput = document.getElementById('ls-repassword');
    const type = repasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    repasswordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Show error message
function showError(message) {
    const errorElement = document.getElementById('ls-error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError() {
    document.getElementById('ls-error-message').style.display = 'none';
}

// Show loading state
function setLoading(isLoading) {
    const btnText = document.getElementById('ls-btn-text');
    const loading = document.getElementById('ls-loading');
    const btn = document.getElementById('ls-submit-btn');
    
    if (isLoading) {
        btn.disabled = true;
        btnText.textContent = isSignUp ? 'Creating Account...' : 'Signing In...';
        loading.style.display = 'inline-block';
    } else {
        btn.disabled = false;
        btnText.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        loading.style.display = 'none';
    }
}

// Save user data to Firestore
async function saveUserData(user, username, role) {
    try {
        // Create user document in Firestore with the user's UID as document ID
        await db.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            username: username,
            role: role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("User data saved successfully");
        return true;
    } catch (error) {
        console.error("Error saving user data:", error);
        showError("Failed to save user data. Please try again.");
        return false;
    }
    }

    // Get user data from Firestore
    async function getUserData(uid) {
    try {
        const doc = await db.collection("users").doc(uid).get();
        if (doc.exists) {
        return doc.data();
        } else {
        console.log("No user data found");
        return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
}

// Show role selection modal for Google sign-up
function showRoleSelectionModal(callback) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '2rem';
    modalContent.style.borderRadius = 'var(--radii)';
    modalContent.style.textAlign = 'center';
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '400px';
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: var(--brown-700);">Select Your Role</h3>
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 2rem;">
        <button class="ls-role-btn active" data-role="artist">Artist</button>
        <button class="ls-role-btn" data-role="buyer">Buyer</button>
        </div>
        <button class="ls-btn" style="margin-top: 0;">Continue</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Set up role selection
    const roleButtons = modalContent.querySelectorAll('.ls-role-btn');
    let selectedRole = "artist";
    
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
        roleButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedRole = this.getAttribute('data-role');
        });
    });
    
    // Set up continue button
    const continueBtn = modalContent.querySelector('.ls-btn');
    continueBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        callback(selectedRole);
    });
}

// Email/password authentication
document.getElementById('ls-auth-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    hideError();
    setLoading(true);
    
    const email = document.getElementById('ls-email').value;
    const password = document.getElementById('ls-password').value;
    
    try {
        if (isSignUp) {
        const username = document.getElementById('ls-username').value;
        const repassword = document.getElementById('ls-repassword').value;
        
        if (password !== repassword) {
            showError('Passwords do not match!');
            setLoading(false);
            return;
        }
        
        if (!username) {
            showError('Please choose a username');
            setLoading(false);
            return;
        }
        
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        const saveSuccess = await saveUserData(user, username, selectedRole);
        
        if (saveSuccess) {
            alert('Account created successfully!');
        }
        } else {
        await auth.signInWithEmailAndPassword(email, password);
        const user = auth.currentUser;
        if (user) {
            await db.collection("users").doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        }
    } catch (error) {
        console.error('Authentication error:', error);
        showError('Authentication error');
        setLoading(false);
    }
});

// Google authentication
document.getElementById('ls-google-btn').addEventListener('click', async function() {
    hideError();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        if (result.additionalUserInfo.isNewUser) {
        const username = user.email.split('@')[0];
        showRoleSelectionModal(async (role) => {
            await saveUserData(user, username, role);
        });
        } else {
        await db.collection("users").doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        }
    } catch (error) {
        console.error('Google sign-in error:', error);
        showError('Google sign-in error');
    }
});