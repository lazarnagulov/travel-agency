const popupLogin = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");
const popupRegister = document.getElementById("register-form");
const registerButton = document.getElementById("register-btn");
const exitRegisterButton = document.getElementById("exit-register");


exitRegisterButton.addEventListener("click", () => {
    popupRegister.style.display = "none";
    
    document.getElementById("username").style.backgroundColor = "";
    document.getElementById("password").style.backgroundColor = "";
    document.getElementById("name").style.backgroundColor = "";
    document.getElementById("surname").style.backgroundColor = "";
    document.getElementById("email").style.backgroundColor = "";
    document.getElementById("date").style.backgroundColor = "";
    document.getElementById("address").style.backgroundColor = "";
    document.getElementById("phonenumber").style.backgroundColor = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
});


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
