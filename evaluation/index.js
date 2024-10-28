//login page functionality


function login() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email.value] === password.value) {
        localStorage.setItem('loggedInUser', email.value);
        alert('Login successful!');
        // Redirect to main page
        window.location.href = 'product.html';
    } else {
        alert('Invalid email or password.');
    }
    email.value = ''
    password.value = ''
}

