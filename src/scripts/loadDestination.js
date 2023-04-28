import { Destination } from "../entities/Destination.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

export function loadDestination(){
    console.log(Destination.destinations);
    console.log(id);
    const destination = Destination.destinations.get(id); 

    console.log(destination);

    if(!destination){
        console.error("Destination does not exist!");
    }
    else{
        destination.createDestinationInfo();
    }
}