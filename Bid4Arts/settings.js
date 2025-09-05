let toastTimer = null;
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.position = 'fixed';
    el.style.top = '16px';
    el.style.right = '16px';
    el.style.background = 'var(--brown-600)';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '10px';
    el.style.boxShadow = 'var(--shadow-md)';
    el.style.zIndex = '80';
    el.style.transform = 'translateX(160%)';
    el.style.transition = 'transform .25s';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.transform = 'translateX(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.style.transform = 'translateX(160%)';
  }, 2000);
}

logoutBtn.addEventListener('click', () => {
  console.log('User logged out.');
  toast('You have been logged out.');
  location.href = '/index.html';
});

const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordErrorMsg = document.getElementById('passwordErrorMsg'); 
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

deleteAccountBtn.addEventListener('click', () => {
  deleteConfirmationModal.style.display = 'flex';
  confirmPasswordInput.value = '';
  confirmPasswordInput.focus();
  confirmPasswordInput.style.borderColor = 'var(--brown-200)';
  passwordErrorMsg.style.display = 'none';
  passwordErrorMsg.textContent = '';
});

cancelDeleteBtn.addEventListener('click', () => {
  deleteConfirmationModal.style.display = 'none';
  toast('Account deletion cancelled.');
  confirmPasswordInput.style.borderColor = 'var(--brown-200)'; 
  passwordErrorMsg.style.display = 'none'; 
  passwordErrorMsg.textContent = ''; 
});

confirmDeleteBtn.addEventListener('click', () => {
  const enteredPassword = confirmPasswordInput.value.trim(); 

  confirmPasswordInput.style.borderColor = 'var(--brown-200)';
  passwordErrorMsg.style.display = 'none';
  passwordErrorMsg.textContent = '';

  if (enteredPassword === '') {
    passwordErrorMsg.textContent = 'Password cannot be empty.'; 
    passwordErrorMsg.style.display = 'block'; 
    confirmPasswordInput.focus();
    return; 
  }

  const storedPasswordPlaceholder = '12345678'; 

  if (enteredPassword === storedPasswordPlaceholder) {
    console.log('Account deletion confirmed with password.');
    toast('Your account has been deleted.'); 
    deleteConfirmationModal.style.display = 'none'; 
    location.href = '/index.html'; 
  } else {
    passwordErrorMsg.textContent = 'Incorrect password.'; 
    passwordErrorMsg.style.display = 'block';
    confirmPasswordInput.value = ''; 
    confirmPasswordInput.style.borderColor = '#b22222'; 
    confirmPasswordInput.focus();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop();
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (currentPath === 'settings.html' && tab.outerHTML.includes('settings.html')) {
      tab.classList.add('active');
    } else if (currentPath === 'index.html' && tab.outerHTML.includes('index.html') && !window.location.hash) {
      tab.classList.add('active');
    }
  });
});