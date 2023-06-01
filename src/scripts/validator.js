import { Destination } from "../entities/Destination.js";
import { User } from "../entities/User.js";
import { Error } from "../scripts/error.js"
import { addUser } from "./firebase.js";

const registerUser = document.getElementById("register-user");
const loginUser = document.getElementById("login-user");
const loginError = document.getElementById("login-error");
const errorColor = "rgb(231, 68, 68)";

const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
const phoneNumberRegex = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");

export function validateAgency(){
    const name = document.getElementById("e-name").value;
    const address = document.getElementById("e-address").value;
    const yearOfOpening = document.getElementById("e-year").value;
    const phoneNumber = document.getElementById("e-phonenumber").value;
    const email = document.getElementById("e-email").value;
    const logo = document.getElementById("e-logo").value;

    let validated = true;

    if(!name){
        document.getElementById("e-name").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-name").style.backgroundColor = "";
    }
    if(!address){
        document.getElementById("e-address").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-address").style.backgroundColor = "";
    }
    if(!yearOfOpening || !parseInt(yearOfOpening)){
        document.getElementById("e-year").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-year").style.backgroundColor = "";
    }
    if(!phoneNumber || !parseInt(phoneNumber)){
        document.getElementById("e-phonenumber").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-phonenumber").style.backgroundColor = "";
    }
    if(!email || !emailRegex.test(email)){
        document.getElementById("e-email").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-email").style.backgroundColor = "";
    }
    if(!logo){
        document.getElementById("e-logo").style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById("e-logo").style.backgroundColor = "";
    }

    return validated;
}

export function validateDestination(option){
    if(option == "add"){
        option = "a"
    }
    else if(option == "edit"){
        option = "e"
    }else{
        return;
    }

    const name = document.getElementById(`${option}-destination-name`).value;
    const description = document.getElementById(`${option}-description`).value;
    let img = null;
    if(option == "a"){
        img = document.getElementById(`${option}-img`).value;
    }
    const price = document.getElementById(`${option}-price`).value;
    const travelers = document.getElementById(`${option}-travelers`).value;
    const transport = document.getElementById(`${option}-transport`).value;
    const type = document.getElementById(`${option}-type`).value;

    let validated = true;
    if(!name){
        document.getElementById(`${option}-destination-name`).style.backgroundColor = errorColor,
        validated = false;
    }else{
        document.getElementById(`${option}-destination-name`).style.backgroundColor = "";
    }
    if(!description){
        document.getElementById(`${option}-description`).style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById(`${option}-description`).style.backgroundColor = "";
    }
    if(option == "a"){
        if(!img){
            document.getElementById(`${option}-img`).style.backgroundColor = errorColor;
            validated = false;
        }else{
            document.getElementById(`${option}-img`).style.backgroundColor = "";
        }
    }
    if(!transport){
        document.getElementById(`${option}-transport`).style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById(`${option}-transport`).style.backgroundColor = "";
    }
    if(!type){
        document.getElementById(`${option}-type`).style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById(`${option}-type`).style.backgroundColor = "";
    }
    if(!price || !parseInt(price) || parseInt(price) <= 0){
        document.getElementById(`${option}-price`).style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById(`${option}-price`).style.backgroundColor = "";
    }
    if(!travelers || !parseInt(travelers) || parseInt(travelers) <= 0){
        document.getElementById(`${option}-travelers`).style.backgroundColor = errorColor;
        validated = false;
    }else{
        document.getElementById(`${option}-travelers`).style.backgroundColor = "";
    }
    return validated;
}

export function validateUser(){
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
    return validated;
}

registerUser.addEventListener('click', () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phonenumber").value;

    if(validateUser()){
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

        optionUser(user);
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
        loginError.style.backgroundColor = "red";
        loginError.style.display = "block";
        loginError.textContent = Error.USER_NOT_FOUND.name;
    }
    if(user.password != password){
        loginError.style.backgroundColor = "red";
        loginError.textContent = Error.WRONG_PASSWORD.name;
        loginError.style.display = "block";
        document.getElementById("l-password").value = "";
    }
    loginError.style.backgroundColor = "green";
    loginError.textContent = "Successful login!";
    loginError.style.display = "block";

    document.getElementById("l-username").value = "";
    document.getElementById("l-password").value = "";

});
