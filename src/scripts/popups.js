const popupLogin = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");
const popupRegister = document.getElementById("register-form");
const registerButton = document.getElementById("register-btn");

loginButton.addEventListener("click", () => {
    if(popupRegister.style.display == "flex")
        popupRegister.style.display = "none";
    popupLogin.style.display = popupLogin.style.display == "none" || popupLogin.style.display == "" ? "flex" : "none"; 
    if(popupLogin.style.display == "flex"){
        document.getElementById("login-error").style.display = "none";
    }
});

registerButton.addEventListener("click", () => {
    if(popupLogin.style.display == "flex")
        popupLogin.style.display = "none";
    popupRegister.style.display = popupRegister.style.display == "none" || popupRegister.style.display == "" ? "flex" : "none";
});
