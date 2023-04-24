export class Destination
{
    static destinationsGroup = new Map();
    static destinations = new Map();
    static headers = ["ID", "Name", "Type", "Transport", "Price", "Travelers"] 

    static selectedDestinaion;

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
            let row = tbody.insertRow()
           
            let cell = row.insertCell();
            let text = document.createTextNode(id);
            cell.appendChild(text);
            
            cell = row.insertCell();
            text = document.createTextNode(dest.name);
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
                Destination.selectedDestinaion = row.children[0]
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
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
                        Type: ${this.type} <br>
                        Transport: ${this.typeOfTransport} <br>
                        Price: ${this.price} <br>
                        Travelers: ${this.maxTravelers} <br>
                        <a href = "#agency-info" id = "remove-destination">Show less</a>
                        <a href = "#">Edit destination</a>
                    </p>
                </div>
                <br>
            `
        const container = document.getElementById("photo-container");

        for(let photo of this.photos){
            container.innerHTML += 
            `<img src="${photo}" alt="${this.name + ".jpg"}" id = ${photo} referrerpolicy="no-referrer">`
        }

        document.getElementById("remove-destination").addEventListener('click', () =>{
            info.style.display = "none";
        })
    }

    static getDestinationsFromGroup(groupId){
        const group = this.destinationsGroup.get(groupId);
        let ret = "";
        if(!group){
            console.error("Group does not exist!");
            return;
        }

        for(let id in group){
            const dest = this.destinations.get(group[id]);
            if(!dest){
                console.error(`Destination ${group[id]} does not exist!`);
            }
            ret += `<a id = ${group[id]} href="#destination-info">${dest.name}</a>`;
        }
        return ret.slice(0,-2);
    }

}