import { Error } from "../scripts/error.js";


export class Destination
{
    static destinationsGroup = new Map();
    static destinations = new Map();
    static headers = ["Name", "Type", "Transport", "Price", "Travelers"] 

    static EMPTY_CARD =
    `
    <div class = "destination-card new-destination white-bg">
        <p><strong>Add destination<strong></p>
        <img src = "../src/img/add.png">
    </div>
    `

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
            let currentDestination = Destination.destinations.get(d); 
            let card =
            `
                <div class = "destination-card white-bg" id = ${d}>
                    <h4>${currentDestination.name}</h4>
                    <img src = "${currentDestination.photos[0]}" referrerpolicy="no-referrer">
                    <p><br><strong>Type: </strong>${currentDestination.type}<br><strong>Transport: </strong>${currentDestination.typeOfTransport}<br></p>
                </div>
            `
            destinationContainer.innerHTML += card;
        }
        if(document.getElementById("edit-destination")){
            destinationContainer.insertAdjacentHTML('beforeend', 
                `    
                    <div id = "add-destination-btn" class = "destination-card new-destination white-bg">
                        <img src = "../src/img/add.png">
                    </div>
                `
            );

            document.getElementById("add-destination-btn").addEventListener('click', () => {
                document.getElementById("add-destination").style.display = "flex";

            });
        }
        for(let d of agencyDestinations){
            let currentDestination = Destination.destinations.get(d); 
            if(!document.getElementById("edit-destination")){
                document.getElementById(d).addEventListener('click', () => {
                    window.location.replace(`./destination.html?id=${currentDestination.id}`);
                });
            }else{
        
                document.getElementById(d).addEventListener('click', () => {
                    let dest = Destination.destinations.get(d);
                    Destination.selectedDestination = dest;
                    document.getElementById("edit-destination").style.display = "flex";
                    document.getElementById("e-destination-name").value = dest.name;
                    document.getElementById("e-description").value = dest.description;
                    document.getElementById("e-type").value = dest.type;
                    document.getElementById("e-transport").value = dest.typeOfTransport;
                    document.getElementById("e-price").value = dest.price;
                    document.getElementById("e-travelers").value = dest.maxTravelers;
                });
            }
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
            ret += `<a id = ${crypto.randomUUID()} href='./destination.html?id=${dest.id}' name = "${group[id]}"><span>${dest.name}</span></a>`;
        }
        return ret;
    }

}