import { Destination } from "../entities/Destination.js";
import { TravelAgency } from "../entities/TravelAgency.js";
import { Error } from "./error.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


export function loadAgency(){
    const agency = TravelAgency.agencies.get(id);
    TravelAgency.selectedAgency = agency; 
    if(!agency){
        window.location.replace(`./error.html?msg=${Error.AGENCY_NOT_FOUND.name}`);
        console.error("Destination does not exist!");
    }
    else if(document.getElementById("agency-info")){
        agency.createAgencyInfo();
    }else{
        document.getElementById("e-name").value = agency.name;
        document.getElementById("e-address").value = agency.address;
        document.getElementById("e-year").value = agency.yearOfOpening;
        document.getElementById("e-phonenumber").value = agency.phoneNumber;
        document.getElementById("e-email").value = agency.email;
        document.getElementById("agency-img").src = agency.logo;
        document.getElementById("e-logo").value = agency.logo;

        Destination.createDestinationCards(Destination.destinationsGroup.get(agency.destinations));
    }
}