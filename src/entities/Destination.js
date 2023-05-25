import { Error } from "../scripts/error.js";


export class Destination
{
    static destinationsGroup = new Map();
    static destinations = new Map();
    static headers = ["Name", "Type", "Transport", "Price", "Travelers"] 

    static selectedDestination;
    static selectedRow;

    constructor(id, name, description, photos, type, typeOfTransport, price, maxTravelers)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photos = photos;
        this.type = type;
        this.typeOfTransport = typeOfTransport;
        this.price = price;
        this.maxTravelers = maxTravelers;
    }

    static addDestination(destination){
        destinations.push(destination.id, destination);
    }

    static removeDestination(id){
        if(!Destination.destinations.has(id)){
            window.location.replace(`./error.html?msg=${Error.AGENCY_NOT_FOUND.name}`);
            console.error("Destination does not exist!");
            return false;
        }
        Destination.destinations.delete(id);
        return true;
    }

    editDestination(){

    }

    static generateTable(table){
        let thead = table.createTHead();
        let row = thead.insertRow();

        for(let header in Destination.headers){
            let th = document.createElement("th");
            let text = document.createTextNode(Destination.headers[header]);
            th.appendChild(text);
            row.appendChild(th);
        }

        let tbody = table.createTBody();

        for(let [id, dest] of Destination.destinations){
            let row = tbody.insertRow();
            row.id = id;

            // let cell = row.insertCell();
            // let text = document.createTextNode(id);
            // cell.appendChild(text);
            
            let cell = row.insertCell();
            let text = document.createTextNode(dest.name);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(dest.type);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(dest.typeOfTransport);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(dest.price);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(dest.maxTravelers);
            cell.appendChild(text);
            
            row.addEventListener('click', () => {
                row.style.backgroundColor = "aqua";
                Destination.selectedRow = row;
                Destination.selectedDestination = Destination.destinations.get(row.getAttribute("id"));
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            });
        }
        document.getElementById("delete-destination").addEventListener('click', () => {
            if(!Destination.selectedDestination){
                alert("Please select destination");
                return;
            }
            if(confirm(`Are you sure you want to delete '${Destination.selectedDestination.name}'?`)){
                if(Destination.removeDestination(Destination.selectedDestination.id)){
                    const rowId = Destination.selectedRow.getAttribute("id");
                    document.getElementById(rowId).remove();
                }
            }
        });

        document.getElementById("edit-destination").addEventListener('click', () => {
            window.location.replace(`./error.html?msg=${Error.NOT_IMPLEMENTED.name}`);
        });

        document.getElementById("add-destination").addEventListener('click', () => {
            window.location.replace(`./error.html?msg=${Error.NOT_IMPLEMENTED.name}`);
        });
    }

    static createDestinationCards(agencyDestinations){
        const destinationContainer = document.getElementById("destinations");
        for (let d of agencyDestinations){
            let card =
            `
                <div class = "destination-card">
                    <img src = "${Destination.destinations.get(d).photos[0]}" >
                    <p title>${Destination.destinations.get(d).description.slice(0,70) + "..."}</p>
                    <a href = ./destination.html?id=${Destination.destinations.get(d).id}>${Destination.destinations.get(d).name}</a>                    
                </div>
            `
            destinationContainer.innerHTML += card;
        }

    }

    createDestinationInfo(){
        const info = document.getElementById("destination-info");
        info.style.display = "block";
        info.innerHTML = 
            `
                <h3>${this.name}</h3>
                <div id = "photo-container"></div>    
                <div class = "info-text destination-margin">
                    <p>
                        ${this.description} <br>
                        <strong>Type:</strong> ${this.type} <br>
                        <strong>Transport:</strong> ${this.typeOfTransport} <br>
                        <strong>Price:</strong> ${this.price} <br>
                        <strong>Travelers:</strong> ${this.maxTravelers} <br>
                        <a href = "./error.html?msg=${Error.NOT_IMPLEMENTED.name}">Edit destination</a>
                        <a href = "./index.html">Back</a>
                    </p>
                </div>
                <br>
            `
        const container = document.getElementById("photo-container");

        for(let photo of this.photos){
            container.innerHTML +=  `<img src="${photo}" alt="${this.name + ".jpg"}" id = ${photo} referrerpolicy="no-referrer">`
        }
    }

    static getDestinationsFromGroup(groupId){
        const group = this.destinationsGroup.get(groupId);
        let ret = "";
        if(!group){
            window.location.replace(`./error.html?msg=${Error.DESTINATION_NOT_FOUND.name}`);
            console.error("Group does not exist!");
            return;
        }
        for(let id in group){
            const dest = Destination.destinations.get(group[id]);
            if(!dest){
                console.error(`Destination ${group[id]} does not exist!`);
            }
            ret += `<a id = ${crypto.randomUUID()} href='./destination.html?id=${dest.id}' name = "${group[id]}">${dest.name}</a>`;
        }
        return ret;
    }

}