export class User{
    static users = new Map();

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
}