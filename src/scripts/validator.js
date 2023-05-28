import { Destination } from "../entities/Destination.js";
import { User } from "../entities/User.js";
import { Error } from "../scripts/error.js"

const registerUser = document.getElementById("register-user");
const loginUser = document.getElementById("login-user");
const loginError = document.getElementById("login-error");

loginUser.addEventListener("click", () => {
    const username = document.getElementById("l-username").value;
    const password = document.getElementById("l-password").value;
    
    let user = null;

    for(let [id, value] of User.users){
        if(value.username == username){
            user = User.users.get(id);
            break;
        }
    }

    if(!user){
        loginError.style.color = "red";
        loginError.style.display = "block";
        loginError.textContent = Error.USER_NOT_FOUND.name;
        return;
    }
    if(user.password != password){
        loginError.style.color = "red";
        loginError.textContent = Error.WRONG_PASSWORD.name;
        loginError.style.display = "block";
        document.getElementById("l-password").value = "";
        return;
    }
    loginError.style.color = "green";
    loginError.textContent = "Successful login!";
    loginError.style.display = "block";

    document.getElementById("l-username").value = "";
    document.getElementById("l-password").value = "";


})
