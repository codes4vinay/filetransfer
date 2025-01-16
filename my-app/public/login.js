
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Both fields are required.');
        return;
    }


    console.log('Login:', { email, password });
    alert('Login successful!');
});
