import { TravelAgency } from "../entities/TravelAgency.js";
import { Destination } from "../entities/Destination.js";
import { User } from "../entities/User.js";
import { Error } from "../scripts/error.js"
import { loadDestination } from "./loadDestination.js";
import { loadAgency } from "./loadAgency.js";

const firebaseURL = "https://turistickaagencija-e6403-default-rtdb.europe-west1.firebasedatabase.app"; 

const agenciesContainer = document.getElementById("agencies-container");

const destinationInfoContainer = document.getElementById("destination-info");
const agencyInfoContainer = document.getElementById("agency-info");

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
        );
    }
    if(agenciesContainer){
        TravelAgency.createCards();
    }
    if(agencyInfoContainer || document.getElementById("edit-agency-info")){
        loadAgency();
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
            );
            if(!Destination.destinationsGroup.has(groupId)){
                Destination.destinationsGroup.set(groupId, [id]);
            }
            else{
                Destination.destinationsGroup.get(groupId).push(id);
            }
            Destination.destinations.set(id, newDestination);
            
        }
    }
    if(destinationInfoContainer){
        loadDestination();
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
    let agenciesData = null;
    let destinationsData = null;
    let usersData = null;
    
    try{
        let response = await fetch(firebaseURL + '/agencije.json');
        agenciesData = await response.json();

        response = await fetch(firebaseURL + '/destinacije.json');
        destinationsData = await response.json();

        response = await fetch(firebaseURL + '/korisnici.json');
        usersData = await response.json();
    }catch{
        // window.location.replace(`./error.html?msg=${Error.DATABASE_ERROR.name}`);
        return;
    }    
    createDestinations(destinationsData);
    createAgencies(agenciesData);
    createUsers(usersData);
    
}

export async function deleteUser(){
    try{
        const user = User.selectedUser;
        const response = await fetch(firebaseURL + "/korisnici/" + user.id +  ".json",{
            method: "DELETE",
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }

}

export async function addUser(user){
    try{
        const response = await fetch(firebaseURL + "/korisnici.json",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                adresa: user.address,
                datumRodjenja: user.birthDate,
                email: user.email,
                ime: user.name,
                korisnickoIme: user.username,
                lozinka: user.password,
                prezime: user.surname,
                telefon: user.phoneNumber
            })
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

export async function updateUser(){
    try{
        const user = User.selectedUser;
        const response = await fetch(firebaseURL + "/korisnici/" + user.id +  ".json",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                adresa: user.address,
                datumRodjenja: user.birthDate,
                email: user.email,
                ime: user.name,
                korisnickoIme: user.username,
                lozinka: user.password,
                prezime: user.surname,
                telefon: user.phoneNumber
            })
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

export async function updateAgency(){
    try{
        const agency = TravelAgency.selectedAgency;
        const response = await fetch(firebaseURL + "/agencije/" + agency.id +  ".json",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                adresa: agency.address,
                brojTelefona: agency.phoneNumber,
                destinacije: agency.destinations,
                email: agency.email,
                godina: agency.yearOfOpening,
                logo: agency.logo,
                naziv: agency.name
            })
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

export async function deleteAgency(){
    try{
        const agency = TravelAgency.selectedAgency;
        const response = await fetch(firebaseURL + "/agencije/" + agency.id +  ".json",{
            method: "DELETE",
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

export async function updateDestination(){
    try{
        const destination = Destination.selectedDestination;
        const response = await fetch(firebaseURL + "/destinacije/" + TravelAgency.selectedAgency.destinations+ "/" + Destination.selectedDestination.id + ".json",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cena: destination.price,
                maxOsoba: destination.maxTravelers,
                naziv: destination.name,
                opis: destination.description,
                prevoz: destination.typeOfTransport,
                slike: destination.photos,
                tip: destination.type
            })
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

export async function deleteDestination(){
    try{
        const response = await fetch(firebaseURL + "/destinacije/" + TravelAgency.selectedAgency.destinations+ "/" + Destination.selectedDestination.id + ".json",{
            method: "DELETE",
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}


export async function addDestination(destination){
    try{
        const response = await fetch(firebaseURL + "/destinacije/" + TravelAgency.selectedAgency.destinations + ".json",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cena: destination.price,
                maxOsoba: destination.maxTravelers,
                naziv: destination.name,
                opis: destination.description,
                prevoz: destination.typeOfTransport,
                slike: destination.photos,
                tip: destination.type
            })
        });
        const result = await response.json();
        window.location.reload();
    }catch(e){
        console.error("Error:" + e);
    }
}

window.addEventListener("load", fetchData);