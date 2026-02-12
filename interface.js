 // Login
 const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.getElementById("closeBtn");
    const welcomePage = document.getElementById("welcomePage");

    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "flex";
      welcomePage.classList.add("blur-effect");
    });

    closeBtn.addEventListener("click", () => {
      loginModal.style.display = "none";
      welcomePage.classList.remove("blur-effect");
    });

    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
        welcomePage.classList.remove("blur-effect");
      }
    }); 
// Role
 const roleBtn = document.getElementById("roleBtn");
    const roleModal = document.getElementById("roleModal");
    const closBtn = document.getElementById("closBtn");

    roleBtn.addEventListener("click", () => {
      roleModal.style.display = "flex";
      welcomePage.classList.add("blur-effect");
    });
   closBtn.addEventListener("click", () => {
      loginModal.style.display = "none";
      welcomePage.classList.remove("blur-effect");
    });
   
    roleModal.addEventListener("click", (e) => {
      if (e.target === roleModal) {
        roleModal.style.display = "none";
        welcomePage.classList.remove("blur-effect");
      }
    }); 
    // See more connection
  const seeMoreBtns = document.querySelectorAll(".seeMoreBtn");

  seeMoreBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      const moreText = this.parentElement.nextElementSibling;

      if (moreText.style.display === "none") {
        moreText.style.display = "block";
        this.textContent = "see less...";
      } else {
        moreText.style.display = "none";
        this.textContent = "see more...";
      }
    });
  });

    
        // =============================
    // BACKEND CONNECTION (HTTP FETCH)
    // =============================
    submitLogin.addEventListener("click", async () => {

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login Successful!");

        } else {
          alert("Login Failed: " + data.message);
        }

      } catch (error) {
        alert("Backend Connection Error!");
        console.log(error);
      }

    });