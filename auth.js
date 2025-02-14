document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("loginForm")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials");
        }
    });

    document.getElementById("registerForm")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("regUsername").value;
        const password = document.getElementById("regPassword").value;

        if (users.some(u => u.username === username)) {
            alert("Username already taken!");
        } else {
            const newUser = { username, password, role: "reader" };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful!");
            window.location.href = "login.html";
        }
    });
});
