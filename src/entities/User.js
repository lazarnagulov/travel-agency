import { Error } from "../scripts/error.js";

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

    static addUser(user){
        User.users.push(destiantion.id, user);
    }

    static removeUser(id){
        if(!User.users.has(id)){
            window.location.replace(`./error.html?msg=${Error.USER_NOT_FOUND.name}`);
            console.error("User does not exist!");
            return false;
        }
        User.users.delete(id);
        return true;
    }

    editUser(){

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
            if(!User.selectedUser){
                alert("Please select user!");
                return;
            }
            if(confirm(`Are you sure you want to delete '${User.selectedUser.username}'?`)){
                if(User.removeUser(User.selectedUser.id)){
                    const rowId = User.selectedRow.getAttribute("id");
                    document.getElementById(rowId).remove();
                }
            }
        });
        document.getElementById("edit-user").addEventListener('click', () => {
            window.location.replace(`./error.html?msg=${Error.NOT_IMPLEMENTED.name}`);
        });

        document.getElementById("add-user").addEventListener('click', () => {
            window.location.replace(`./error.html?msg=${Error.NOT_IMPLEMENTED.name}`);
        });
    }


}
