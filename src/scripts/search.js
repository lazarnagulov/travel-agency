import { Destination } from "../entities/Destination.js";
import { TravelAgency } from "../entities/TravelAgency.js";

const searchImg = document.getElementById("search-img");
const searchOptions = document.getElementById("search-options");
const searchButton = document.getElementById("search-btn");
const searchReset = document.getElementById("search-reset");

const agencyTextbox = document.getElementById("search-agency");
const destinationTextbox = document.getElementById("search-destination");

searchImg.addEventListener('click', () => {
    searchOptions.style.display = searchOptions.style.display == "none" || searchOptions.style.display == "" ? "flex" : "none"; 
});

searchReset.addEventListener('click', () => {
    for(let [_, value] of TravelAgency.agencies){
        document.getElementById("card" + value.id).style.display = "";
    }
})

searchButton.addEventListener('click', () => {
    const agency = agencyTextbox.value;
    const destination = destinationTextbox.value;

    if(agency){
        for(let [_, value] of TravelAgency.agencies){
            let agencyName = value.name.toLowerCase();
            if(!agencyName.includes(agency.toLowerCase())){
                document.getElementById("card" + value.id).style.display = "none";
            }        
        }
    }

    if(destination){
        for(let [_, value] of TravelAgency.agencies){
            let found = false;
            let destinationGroup = value.destinations;
            for(let d in Destination.destinationsGroup.get(destinationGroup)){
                let destinationName = Destination.destinations.get(Destination.destinationsGroup.get(destinationGroup)[d]).name.toLowerCase();
                if(destinationName.includes(destination.toLowerCase())){
                    found = true;
                    break;
                }
            }
            if(!found){
                document.getElementById("card" + value.id).style.display = "none";
            }
        }
    }

});