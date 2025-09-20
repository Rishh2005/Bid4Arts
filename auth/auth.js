function initializeApp() {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    let isSignUp = false;
    let selectedRole = "artist";
    
    // Hide the loader with a slight delay for a smooth transition
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 300);

    // Check if user is already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            showLoader("Welcome Back", "Loading your creative space");
            // Check if user exists in Firestore before redirecting
            db.collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        completeLoader();
                        setTimeout(() => {
                            window.location.href = "pages/home.html";
                        }, 800);
                    } else {
                        // User authenticated but doesn't have a profile yet
                        console.log("User authenticated but no profile found");
                        // Don't sign out - let the user complete registration
                        showRoleSelectionModal(async (role) => {
                            const username = user.displayName || user.email.split('@')[0];
                            const saveSuccess = await saveUserData(user, username, role);
                            if (saveSuccess) {
                                completeLoader();
                                setTimeout(() => {
                                    window.location.href = "pages/home.html";
                                }, 800);
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error checking user profile:", error);
                    hideLoader();
                });
        }
    });

    // Loader functions
    function showLoader(text = "Creating Masterpiece", subtext = "Mixing colors and inspiration") {
        document.getElementById('loader-text').textContent = text;
        document.getElementById('loader-subtext').textContent = subtext;
        document.getElementById('loader').classList.remove('hidden');
        
        // Reset progress animation
        const progressBar = document.getElementById('loader-progress');
        const percentage = document.getElementById('loader-percentage');
        progressBar.style.width = '0%';
        percentage.textContent = '0% Complete';
        
        let width = 0;
        const targetWidth = 65;
        const increment = (targetWidth - width) / 20;
        
        const progressInterval = setInterval(() => {
            if (width < targetWidth) {
                width += increment;
                progressBar.style.width = Math.round(width) + '%';
                percentage.textContent = Math.round(width) + '% Complete';
            } else {
                clearInterval(progressInterval);
            }
        }, 100);
    }

    function hideLoader() {
        document.getElementById('loader').classList.add('hidden');
    }

    function completeLoader() {
        const progressBar = document.getElementById('loader-progress');
        const percentage = document.getElementById('loader-percentage');
        
        let width = parseInt(progressBar.style.width) || 65;
        const targetWidth = 100;
        const increment = (targetWidth - width) / 10;
        
        const progressInterval = setInterval(() => {
            if (width < targetWidth) {
                width += increment;
                progressBar.style.width = Math.round(width) + '%';
                percentage.textContent = Math.round(width) + '% Complete';
            } else {
                clearInterval(progressInterval);
                setTimeout(hideLoader, 500);
            }
        }, 100);
    }

    function toggleForm() {
        isSignUp = !isSignUp;

        document.getElementById('ls-form-title').textContent = isSignUp ? 'Sign up as' : 'Sign in to your account';
        document.getElementById('ls-btn-text').textContent = isSignUp ? 'Sign Up' : 'Sign In';
        document.getElementById('ls-role-section').style.display = isSignUp ? 'flex' : 'none';
        document.getElementById('ls-username').parentElement.style.display = isSignUp ? 'block' : 'none';
        document.getElementById('ls-repassword').parentElement.style.display = isSignUp ? 'block' : 'none';
        document.getElementById('ls-forgot-password').style.display = isSignUp ? 'none' : 'block';
        document.querySelector('.ls-subheading').textContent = isSignUp ? 'Join our creative community' : 'Welcome back to our creative community';
        
        document.querySelector('.ls-switch-text').innerHTML = 
            isSignUp ? 'Already have an account? <span class=\"ls-switch-link\" id=\"ls-switch-link\">Sign In</span>' 
                 : 'Don\'t have an account? <span class=\"ls-switch-link\" id=\"ls-switch-link\">Sign Up</span>';
        
        // Reattach event listener to the new switch link
        document.getElementById('ls-switch-link').addEventListener('click', toggleForm);
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
            }, { merge: true }); // Use merge to avoid overwriting existing data
            
            console.log("User data saved successfully");
            return true;
        } catch (error) {
            console.error("Error saving user data:", error);
            showError("Failed to save user data. Please try again.");
            return false;
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
            <button type="button" class="ls-role-btn active" data-role="artist">Artist</button>
            <button type="button" class="ls-role-btn" data-role="buyer">Buyer</button>
            </div>
            <button type="button" class="ls-btn" style="margin-top: 0;">Continue</button>
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

    // Forgot Password Modal Functions
    function showForgotPasswordModal() {
        document.getElementById('forgot-password-modal').classList.add('active');
        document.getElementById('reset-error').style.display = 'none';
        document.getElementById('reset-success').style.display = 'none';
        document.getElementById('reset-email').value = document.getElementById('ls-email').value || '';
    }

    function hideForgotPasswordModal() {
        document.getElementById('forgot-password-modal').classList.remove('active');
    }

    async function handlePasswordReset() {
        const email = document.getElementById('reset-email').value;
        const errorElement = document.getElementById('reset-error');
        const successElement = document.getElementById('reset-success');
        
        errorElement.style.display = 'none';
        successElement.style.display = 'none';
        
        if (!email) {
            errorElement.textContent = 'Please enter your email address';
            errorElement.style.display = 'block';
            return;
        }
        
        try {
            showLoader("Sending Reset Link", "Preparing your password reset email");
            await auth.sendPasswordResetEmail(email);
            hideLoader();
            successElement.textContent = 'Password reset email sent! Check your inbox.';
            successElement.style.display = 'block';
            
            // Hide success message and close modal after 3 seconds
            setTimeout(() => {
                hideForgotPasswordModal();
            }, 3000);
        } catch (error) {
            hideLoader();
            console.error('Password reset error:', error);
            errorElement.textContent = error.message || 'Error sending password reset email';
            errorElement.style.display = 'block';
        }
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
            
            if (password.length < 6) {
                showError('Password should be at least 6 characters');
                setLoading(false);
                return;
            }
            
            showLoader("Creating Account", "Setting up your creative space");
            
            // Create user with email and password
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            const saveSuccess = await saveUserData(user, username, selectedRole);
            
            if (saveSuccess) {
                completeLoader();
                // Redirect after successful signup
                setTimeout(() => {
                    window.location.href = "pages/home.html";
                }, 800);
            }
            } else {
            showLoader("Signing In", "Accessing your account");
            await auth.signInWithEmailAndPassword(email, password);
            const user = auth.currentUser;
            if (user) {
                await db.collection("users").doc(user.uid).update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            completeLoader();
            }
        } catch (error) {
            hideLoader();
            console.error('Authentication error:', error);
            showError(error.message || 'Authentication error');
            setLoading(false);
        }
    });

    // Google authentication
    document.getElementById('ls-google-btn').addEventListener('click', async function() {
        hideError();
        showLoader("Connecting with Google", "Authenticating your account");
        const provider = new firebase.auth.GoogleAuthProvider();
        
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            
            // Check if user is new or existing
            const userDoc = await db.collection("users").doc(user.uid).get();
            
            if (!userDoc.exists) {
                // New user - show role selection
                hideLoader();
                const username = user.displayName || user.email.split('@')[0];
                showRoleSelectionModal(async (role) => {
                    showLoader("Completing Registration", "Setting up your profile");
                    const saveSuccess = await saveUserData(user, username, role);
                    if (saveSuccess) {
                        completeLoader();
                        setTimeout(() => {
                            window.location.href = "pages/home.html";
                        }, 800);
                    }
                });
            } else {
                // Existing user - update last login and redirect
                await db.collection("users").doc(user.uid).update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
                completeLoader();
                setTimeout(() => {
                    window.location.href = "pages/home.html";
                }, 800);
            }
        } catch (error) {
            hideLoader();
            console.error('Google sign-in error:', error);
            showError(error.message || 'Google sign-in error');
        }
    });

    // Add event listeners
    document.getElementById('ls-switch-link').addEventListener('click', toggleForm);
    document.getElementById('ls-forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showForgotPasswordModal();
    });
    document.getElementById('modal-close').addEventListener('click', hideForgotPasswordModal);
    document.getElementById('reset-password-btn').addEventListener('click', handlePasswordReset);

    // Close modal when clicking outside
    document.getElementById('forgot-password-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideForgotPasswordModal();
        }
    });

    // Handle Enter key in reset email field
    document.getElementById('reset-email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handlePasswordReset();
        }
    });
}