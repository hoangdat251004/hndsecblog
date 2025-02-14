document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutLink = document.getElementById("logoutLink");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const hashedPassword = CryptoJS.MD5(password).toString();

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.username === username && u.password === hashedPassword);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("newUsername").value;
            const password = document.getElementById("newPassword").value;
            const hashedPassword = CryptoJS.MD5(password).toString();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(u => u.username === username)) {
                alert("Username already exists!");
                return;
            }

            const newUser = { username, password: hashedPassword, role: "reader" };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful!");
            window.location.href = "login.html";
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });
    }
});
