// public/login.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Both fields are required.');
        return;
    }

    // Handle login (e.g., validate or send to backend)
    console.log('Login:', { email, password });
    alert('Login successful!');
});
