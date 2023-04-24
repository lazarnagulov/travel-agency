
export class User{
    static users = new Map();
    static headers = ["ID", "Username", "Password", "Name", "Surname", "Email", "Birth", "Address", "Phone number"];
    static selectedUser;

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
           
            let cell = row.insertCell();
            let text = document.createTextNode(id);
            cell.appendChild(text);
           
            cell = row.insertCell();
            text = document.createTextNode(user.username);
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
                row.style.backgroundColor = "white";
                User.selectedUser = row.children[0]
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
        }
    }

    static registerUser(username, password, name, surname, email, birthDate, address, phoneNumber){

    }

    static updateUser(user){

    }

    static removeUser(user){
        User.users.delete(user);
    }

}