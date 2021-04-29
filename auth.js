

auth.onAuthStateChanged(user=>{
    // console.log(user)
    getTodos();
    setupUI(user);
})

// LOGOUT 
const logout=document.getElementById('logout')
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut();
})


// LOGIN 
// For The SIGNUP Page 
const loginForm=document.querySelector('#login-form')
loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password).then(()=>{
        const modal=document.getElementById('modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.querySelector('.error').innerHTML=''
        loginForm.reset();
    }).catch(err=>{
        loginForm.querySelector('.error').innerHTML=err.message
    })
})


// For The SIGNUP Page 
const signupForm=document.querySelector('#signup-form')
signupForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email,password).then(()=>{
        const modal=document.getElementById('modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.querySelector('.error').innerHTML=''
        signupForm.reset();
    }).catch(err=>{
        signupForm.querySelector('.error').innerHTML=err.message
    })
})
