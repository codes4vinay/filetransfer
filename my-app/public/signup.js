// public/signup.js
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
    }

    // Handle signup (e.g., validate or send to backend)
    console.log('Signup:', { email, password });
    alert('Signup successful! Please log in.');
});
