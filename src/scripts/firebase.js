import { TravelAgency } from "../entities/TravelAgency.js";
import { Destination } from "../entities/Destination.js";
import { User } from "../entities/User.js";

const firebaseURL = "https://turistickaagencija-e6403-default-rtdb.europe-west1.firebasedatabase.app"; 

const agenciesContainer = document.getElementById("agencies-container");

const userTable = document.getElementById("users-table");
const destinationTable = document.getElementById("destinations-table");
const agencyTable = document.getElementById("agencies-table");


function createAgencies(agenciesData){
    for(let id in agenciesData){
        const agency = agenciesData[id];
        TravelAgency.agencies.set(id,
            new TravelAgency(
                id, 
                agency.naziv,
                agency.adresa,
                agency.godina,
                agency.logo,
                agency.brojTelefona,
                agency.email,
                agency.destinacije  
            )
        )
    }
    if(agenciesContainer){
        TravelAgency.createCards();
    }
    if(agencyTable){
        TravelAgency.generateTable(agencyTable);
    }
}

function createDestinations(destinationsData){
    for(let groupId in destinationsData){
        for(let id in destinationsData[groupId]){
            const destination = destinationsData[groupId][id];
            const newDestination = new Destination(
                id,
                destination.naziv,
                destination.opis,
                destination.slike,
                destination.tip,
                destination.prevoz,
                destination.cena,
                destination.maxOsoba
            )
            if(!Destination.destinationsGroup.has(groupId)){
                Destination.destinationsGroup.set(groupId, [id]);
            }
            else{
                Destination.destinationsGroup.get(groupId).push(id);
            }
            Destination.destinations.set(id, newDestination);
        }
    }

    if(destinationTable){
        Destination.generateTable(destinationTable);
    }
}


function createUsers(usersData){
    for(let id in usersData){
        const user = usersData[id];
        User.users.set(id,
            new User(
                id,
                user.korisnickoIme,
                user.lozinka,
                user.ime,
                user.prezime,
                user.email,
                user.datumRodjenja,
                user.adresa,
                user.telefon
            )
        )
    }
    if(userTable){
        User.generateTable(userTable);
    }
}

async function fetchData(){
    let response = await fetch(firebaseURL + '/agencjie.json');
    const agenciesData = await response.json();
    
    response = await fetch(firebaseURL + '/destinacije.json');
    const destinationsData = await response.json();

    response = await fetch(firebaseURL + '/korisnici.json');
    const usersData = await response.json();
    
    createDestinations(destinationsData);
    createAgencies(agenciesData);
    createUsers(usersData);
}

fetchData();