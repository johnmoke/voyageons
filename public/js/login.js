let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;   
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => {
        if(resp.status === 400) {
            throw new Error();
        }
        return resp.json();
    }).then((data) => {
        window.location.href = data.redirectURL; 
    }).catch(() => alert('Wrong email or password'));
})

// Registration process
registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;
    // Password and re-password has to be identical, we have to check that
    if(password !== rePassword) { 
        return;
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => resp.text()) .then((data) => alert(data));
})