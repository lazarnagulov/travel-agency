import { TravelAgency } from "../entities/TravelAgency.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


export function loadAgency(){
    const agency = TravelAgency.agencies.get(id);

    if(!agency){
        console.error("Destination does not exist!");
    }
    else{
        agency.createAgencyInfo();
    }
}