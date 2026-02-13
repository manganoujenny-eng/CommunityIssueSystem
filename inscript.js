const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();
    const message = document.getElementById("message");

    message.className = "";
    message.textContent = "";

    // Check empty fields
    if (name === "" || email === "" || tel === "" || password === "" || password2 === "") {
        message.className = "error";
        message.textContent = "All fields are required!";
        return;
    }

    // Check password length
    if (password.length < 8) {
        message.className = "error";
        message.textContent = "Password must be at least 8 characters!";
        return;
    }

    // Check password match
    if (password !== password2) {
        message.className = "error";
        message.textContent = "Passwords do not match!";
        return;
    }

    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
        message.className = "error";
        message.textContent = "Please enter a valid email!";
        return;
    }

    // Phone number validation
    if (tel.length < 8) {
        message.className = "error";
        message.textContent = "Please enter a valid contact number!";
        return;
    }

    // If all is valid
    message.className = "success";
    message.textContent = "Registering... Please wait.";

    // BACKEND HTTPS CONNECTION
    try {
        const response = await fetch("https://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                tel: tel,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.className = "success";
            message.textContent = "Registration Successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            message.className = "error";
            message.textContent = data.message || "Registration Failed!";
        }

    } catch (error) {
        message.className = "error";
        message.textContent = "Backend connection error!";
        console.log(error);
    }
});
