import { Destination  } from "./Destination.js";

export class TravelAgency
{
    static agencies = new Map();

    constructor(id, name, address, yearOfOpening, logo, phoneNumber, email, destinations)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.yearOfOpening = yearOfOpening;
        this.logo = logo;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.destinations = destinations;
    }

    createCard(container){
        container.innerHTML +=
            `
                <div class="agency"> 
                    <img src="./img/${this.name + ".jpg"}" alt="${this.name + ".jpg"}">
                    <h3>${this.name}</h3>
                    <a href="#agency-info" class="btn" id = ${this.id}>Read more</a>
                </div>
            `
    }

    createAgencyInfo(){
        const info = document.getElementById("agency-info");
        info.style.display = "flex";
        info.className = "bg-color";
        info.innerHTML = 
        `
            <h2>${this.name}</h2>
            <img src="./img/${this.name}.jpg" alt = "${this.name}.jpg">
            <div class = "info-text">
                <h4>
                    Adress: ${this.address} <br>
                    Year: ${this.yearOfOpening} <br>
                    Phone number: ${this.phoneNumber} <br>   
                    Email: ${this.email} <br>
                    Destinations: <br>
                </h4>
                <div class = "destinations">
                    ${Destination.getDestinationsFromGroup(this.destinations)} <br>
                    <a href = "#" id = "remove-info">Show less</a>
                </div>
            </div>
        `
        document.getElementById("remove-info").addEventListener('click', () => {
            info.style.display = "none";
        })
    }

}