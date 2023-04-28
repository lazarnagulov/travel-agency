export class Error{
    static DESTINATION_NOT_FOUND = new Error("Destination not found!");
    static AGENCY_NOT_FOUND = new Error("Agency not found!");
    static USER_NOT_FOUND = new Error("User not found!");
    static NOT_IMPLEMENTED = new Error("Not implemented!");

    constructor(name){
        this.name = name;
    }
}