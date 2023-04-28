import { TravelAgency } from "../entities/TravelAgency.js";
import { Error } from "./error.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


export function loadAgency(){
    const agency = TravelAgency.agencies.get(id);

    if(!agency){
        window.location.replace(`./error.html?msg=${Error.AGENCY_NOT_FOUND.name}`);
        console.error("Destination does not exist!");
    }
    else{
        agency.createAgencyInfo();
    }
}