import { Destination } from "../entities/Destination.js";
import { User } from "../entities/User.js";
import { Error } from "../scripts/error.js"
import { addUser } from "./firebase.js";

const registerUser = document.getElementById("register-user");
const loginUser = document.getElementById("login-user");
const loginError = document.getElementById("login-error");


registerUser.addEventListener('click', () => {
    const errorColor = "rgb(231, 68, 68)";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phonenumber").value;

    let validated = true;

    const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    const phoneNumberRegex = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");

    if(!username || User.usernameExists(username)){
        document.getElementById("username").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("username").style.backgroundColor = "";
    }
    if(!name){
        document.getElementById("name").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("name").style.backgroundColor = "";
    }
    if(!password){
        document.getElementById("password").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("password").style.backgroundColor = "";
    }
    if(!surname){
        document.getElementById("surname").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("surname").style.backgroundColor = "";
    }
    if(!(email && emailRegex.test(email))){
        document.getElementById("email").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("email").style.backgroundColor = "";
    }
    if(!date){
        document.getElementById("date").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("date").style.backgroundColor = "";
    }
    if(!address){
        document.getElementById("address").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("address").style.backgroundColor = "";
    }
    if(!phoneNumber || !phoneNumberRegex.test(phoneNumber)){
        document.getElementById("phonenumber").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("phonenumber").style.backgroundColor = "";
    }
    if(validated){
        const user = new User(
            null,
            username,
            password,
            name,
            surname,
            email,
            date,
            address,
            phoneNumber
        );

        addUser(user);
    }
});

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
    }
    if(user.password != password){
        loginError.style.color = "red";
        loginError.textContent = Error.WRONG_PASSWORD.name;
        loginError.style.display = "block";
        document.getElementById("l-password").value = "";
    }
    loginError.style.color = "green";
    loginError.textContent = "Successful login!";
    loginError.style.display = "block";

    document.getElementById("l-username").value = "";
    document.getElementById("l-password").value = "";

});
