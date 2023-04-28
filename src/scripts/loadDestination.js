import { Destination } from "../entities/Destination.js";
import { Error } from "../scripts/error.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

export function loadDestination(){
    const destination = Destination.destinations.get(id); 
    
    if(!destination){
        window.location.replace(`./error.html?msg=${Error.DESTINATION_NOT_FOUND.name}`);
        console.error("Destination does not exist!");
    }
    else{
        destination.createDestinationInfo();
    }
}