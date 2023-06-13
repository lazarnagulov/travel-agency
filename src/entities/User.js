import { Error } from "../scripts/error.js";
import { addUser, deleteUser } from "../scripts/firebase.js";

export class User{
    static users = new Map();
    static headers = ["Username", "Password", "Name", "Surname", "Email", "Birth", "Address", "Phone number"];
    
    static selectedUser;
    static selectedRow;

    constructor(id, username, password, name, surname, email, birthDate, address, phoneNumber) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthDate = birthDate;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    static usernameExists(username){
        for(let [_, user] of User.users){
            if(user.username == username){
                return true;
            }
        }
        return false;
    }

    static generateTable(table){
        let thead = table.createTHead();
        let row = thead.insertRow();

        for(let header in User.headers){
            let th = document.createElement("th");
            let text = document.createTextNode(User.headers[header]);
            th.appendChild(text);
            row.appendChild(th);
        }

        let tbody = table.createTBody();

        for(let [id, user] of User.users){
            let row = tbody.insertRow()
            row.id = id;

            let cell = row.insertCell();
            let text = document.createTextNode(user.username);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.password);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.name);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.surname);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.email);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.birthDate);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.address);
            cell.appendChild(text)

            cell = row.insertCell();
            text = document.createTextNode(user.phoneNumber);
            cell.appendChild(text)

            row.addEventListener('click', () => {
                row.style.backgroundColor = "aqua";
                User.selectedRow = row;
                User.selectedUser = User.users.get(row.getAttribute("id"));
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
        }

        document.getElementById("delete-user").addEventListener('click', () => {
            document.getElementById("modal").style.display = "inline";
            
            if(!User.selectedUser){
                document.getElementById("modal-confirm").innerText = "OK";
                document.getElementById("modal-cancel").style.display = "none";
                document.getElementById("modal-message").innerText = "Please select user!";
                document.getElementById("modal-confirm").addEventListener('click', () =>{
                    document.getElementById("modal").style.display = "";
                });       
                return;
            }
            document.getElementById("modal-cancel").style.display = "flex";
            document.getElementById("modal-confirm").innerText = "Yes";
            document.getElementById("modal-cancel").innerText = "No";
            document.getElementById("modal-message").innerText = `Are you sure you want to delete ${User.selectedUser.username}?`;
            document.getElementById("modal-confirm").addEventListener('click', () =>{
                deleteUser();
            });       
            document.getElementById("modal-cancel").addEventListener('click', () =>{
                document.getElementById("modal").style.display = "";
            });      
        });

        document.getElementById("add-user").addEventListener('click', () => {
            document.getElementById("username").style.backgroundColor = "";
            document.getElementById("password").style.backgroundColor = "";
            document.getElementById("name").style.backgroundColor = "";
            document.getElementById("surname").style.backgroundColor = "";
            document.getElementById("email").style.backgroundColor = "";
            document.getElementById("date").style.backgroundColor = "";
            document.getElementById("address").style.backgroundColor = "";
            document.getElementById("phonenumber").style.backgroundColor = "";

            const popupRegister = document.getElementById("register-form");
            if(popupLogin.style.display == "flex")
                popupLogin.style.display = "none";
            popupRegister.style.display = popupRegister.style.display == "none" || popupRegister.style.display == "" ? "flex" : "none";
        });

    }
}
