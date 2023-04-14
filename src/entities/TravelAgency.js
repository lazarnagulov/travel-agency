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
            `<div class="agency"> 
                <img src="./img/${this.name + ".jpg"}" alt="${this.name + ".jpg"}">
                <h3>${this.name}</h3>
                <p>
                    Address: ${this.address}
                    Destinations: ${Destination.getDestinationsFromGroup(this.destinations)}
                </p>
                <a href="#" class="btn">Read more</a>
            `
    }
}