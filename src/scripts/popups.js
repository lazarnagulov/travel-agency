const popupLogin = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");
const popupRegister = document.getElementById("register-form");
const registerButton = document.getElementById("register-btn");


loginButton.addEventListener("click", () => {
    popupLogin.style.display = popupLogin.style.display == "none" || popupLogin.style.display == "" ? "flex" : "none"; 
});

registerButton.addEventListener("click", () => {
    popupRegister.style.display = popupRegister.style.display == "none" || popupRegister.style.display == "" ? "flex" : "none";
});
