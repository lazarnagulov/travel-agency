export class Error{
    static DESTINATION_NOT_FOUND = new Error("Destination not found!");
    static AGENCY_NOT_FOUND = new Error("Agency not found!");
    static USER_NOT_FOUND = new Error("User not found!");
    static NOT_IMPLEMENTED = new Error("Not implemented!");
    static DATABASE_ERROR = new Error("Data base error!");
    static WRONG_PASSWORD = new Error("Wrong password!");

    constructor(name){
        this.name = name;
    }
}