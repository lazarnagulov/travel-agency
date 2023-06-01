import { Destination } from "../entities/Destination.js";
import { TravelAgency } from "../entities/TravelAgency.js";

const searchImg = document.getElementById("search-img");
const searchOptions = document.getElementById("search-options");
const searchButton = document.getElementById("search-btn");

const agencyTextbox = document.getElementById("search-agency");
const destinationTextbox = document.getElementById("search-destination");

if(agencyTextbox){
    searchImg.addEventListener('click', () => {
        agencyTextbox.value = "";
        destinationTextbox.value = "";
        searchOptions.style.display = searchOptions.style.display == "none" || searchOptions.style.display == "" ? "flex" : "none"; 
    });



    searchButton.addEventListener('click', () => {
        TravelAgency.createCards();

        const agency = agencyTextbox.value;
        const destination = destinationTextbox.value;

        const agencyRegex = new RegExp(`(${agency.toLowerCase()})(?!([^<]+)?>)`, "gi");
        const destinationRegex = new RegExp(`(${destination.toLowerCase()})(?!([^<]+)?>)`, "gi");

        const agenciesFound = [];

        if(agency){
            for(let [_, value] of TravelAgency.agencies){
                let agencyName = value.name.toLowerCase();
                if(!agencyName.includes(agency.toLowerCase())){
                    document.getElementById("card" + value.id).style.display = "none";
                }else{
                    document.getElementById("card" + value.id).style.display = "";
                    agenciesFound.push(value);
                    for(let child of document.getElementById("card" + value.id).children){
                        let text = child.innerHTML;
                        let checker = text.slice().toLowerCase();
                        if(text.includes("Destinations:") || text.includes("More info") ){
                            continue;
                        }
                        if(checker.includes(agency.toLowerCase())){
                            let a = agency.toUpperCase();
                            let replaced = text.replace(agencyRegex, `<mark>${a}</mark>`);
                            child.innerHTML = replaced;
                        }
                    }
                }
            }
        }

        if(destination){
            if(!agency){
                for(let [_, value] of TravelAgency.agencies){
                    let destinationGroup = value.destinations;
                    let foundDestination = findDestination(destination, destinationGroup, value);
                    if(foundDestination){
                        for(let child of document.getElementById(foundDestination).children){
                            let text = child.innerHTML;
                            let checker = text.slice().toLowerCase();
                            if(text.includes("Destinations:") || text.includes("More info") ){
                                continue;
                            }
                            if(checker.includes(destination.toLowerCase())){
                                let d = destination.toUpperCase();
                                let replaced = text.replace(destinationRegex, `<mark>${d}</mark>`);
                                child.innerHTML = replaced;
                            }
                        }                   
                    }

                }
            }else{
                for(let a in agenciesFound){
                    let destinationGroup = agenciesFound[a].destinations;
                    let foundDestination = findDestination(destination, destinationGroup, agenciesFound[a]);
                    if(foundDestination){
                        for(let child of document.getElementById(foundDestination).children){
                            let text = child.innerHTML;
                            let checker = text.slice().toLowerCase();
                            if(text.includes("Destinations:") || text.includes("More info") ){
                                continue;
                            }
                            if(checker.includes(destination.toLowerCase())){
                                let d = destination.toUpperCase();
                                let replaced = text.replace(destinationRegex, `<mark style>${d}</mark>`);
                                child.innerHTML = replaced;
                            }
                        }                   
                    }
                }
            }
        }
    });
}
function findDestination(destination, destinationGroup, value){
    let found = false;
    for(let d in Destination.destinationsGroup.get(destinationGroup)){
        let destinationName = Destination.destinations.get(Destination.destinationsGroup.get(destinationGroup)[d]).name.toLowerCase();
        if(destinationName.includes(destination.toLowerCase())){
            found = true;
            break;
        }
    }
    if(!found){
        document.getElementById("card" + value.id).style.display = "none";
        return null;
    }else{
        document.getElementById("card" + value.id).style.display = "";
        return "card" + value.id;
    }
}