import { Destination  } from "./Destination.js";

export class TravelAgency
{
    static agencies = new Map();
    static headers = ["ID", "Name", "Address", "Year", "Phone number", "Email", "Destination"]

    static selectedAgency;
    static selectedRow;

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

    static addAgency(agency){
        agencies.push(agency.id, agency);
    }

    static removeAgency(id){
        if(!TravelAgency.agencies.has(id)){
            console.error("Agency does not exist!");
            return false;
        }
        TravelAgency.agencies.delete(id);
        return true;
    }

    editAgency(){

    }

    static generateTable(table){
        let thead = table.createTHead();
        let row = thead.insertRow();

        for(let header in TravelAgency.headers){
            let th = document.createElement("th");
            let text = document.createTextNode(TravelAgency.headers[header]);
            th.appendChild(text);
            row.appendChild(th);
        }

        let tbody = table.createTBody();

        for(let [id, agency] of TravelAgency.agencies){
            let row = tbody.insertRow()
            row.id = id;

            let cell = row.insertCell();
            let text = document.createTextNode(id);
            cell.appendChild(text);
        
            cell = row.insertCell();
            text = document.createTextNode(agency.name);
            cell.appendChild(text);
            
            cell = row.insertCell();
            text = document.createTextNode(agency.address);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(agency.yearOfOpening);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(agency.phoneNumber);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(agency.email);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(agency.destinations);
            cell.appendChild(text);
            
            row.addEventListener('click', () => {
                row.style.backgroundColor = "aqua";
                TravelAgency.selectedRow = row;
                TravelAgency.selectedAgency = TravelAgency.agencies.get(row.children[0].innerText);
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
        }
        document.getElementById("delete-agency").addEventListener('click', () => {
            if(confirm(`Are you sure you want to delete '${TravelAgency.selectedAgency.name}'?`)){
                if(TravelAgency.removeAgency(TravelAgency.selectedAgency.id)){
                    const rowId = TravelAgency.selectedRow.getAttribute("id");
                    document.getElementById(rowId).remove();
                }
            }
        });
        
    }

    static createCards(){
        const agenciesContainer = document.getElementById("agencies-container");
        let count = 0;
        for(let [_, agency] of TravelAgency.agencies){
            let card = 
            `
                <div class="agency"> 
                    <img src="${agency.logo}" alt="${agency.name + ".jpg"}" referrerpolicy="no-referrer">
                    <h3>${agency.name}</h3>
                    <strong>Destinations:</strong>
                    <span class = "card-destinations">${Destination.getDestinationsFromGroup(agency.destinations)}</span>
                    <a href="#agency-info" class="btn" id = ${agency.id}>More info</a>
                </div>
            `    
            agenciesContainer.innerHTML += card;
            ++count;
        }

        while(count--){
            let children = document.getElementsByClassName("card-destinations")[count].children;  
            for(let i = 0; i < children.length; ++i){
                let id = children[i].getAttribute("name");
                if(id){
                    document.getElementById(children[i].getAttribute("id")).addEventListener('click', () => {
                        let dest = Destination.destinations.get(id);
                        if(dest){
                            dest.createDestinationInfo();
                        }
                    })
                }
            }
        }

        for(let [id, agency] of TravelAgency.agencies){
            document.getElementById(id).addEventListener('click', () => {
                agency.createAgencyInfo();
            })
        }
    }

    createAgencyInfo(){
        const info = document.getElementById("agency-info");
        const destinations = Destination.getDestinationsFromGroup(this.destinations);
        info.style.display = "flex";
        info.className = "bg-color";
        info.innerHTML = 
        `
            <h3>${this.name}</h3>
            <img src="${this.logo}" alt = "${this.name}.jpg" referrerpolicy="no-referrer">
            <div class = "info-text info-margin">
                <p>
                    <strong>Address</strong>: ${this.address} <br>
                    <strong>Year</strong>: ${this.yearOfOpening} <br>
                    <strong>Phone number:</strong> ${this.phoneNumber} <br>   
                    <strong>Email:</strong> ${this.email} <br>
                    <strong>Destinations:</strong> <br>
                </p>
                <div class = "destinations">
                    ${destinations}
                </div>
                <a href = "#" id = "remove-info">Show less</a>
            </div>
        `

        const children = document.getElementsByClassName("destinations")[0].children

        for(let i = 0; i < children.length; ++i){
            const id = children[i].getAttribute("name");
            if(id){
                document.getElementById(children[i].getAttribute("id")).addEventListener('click', () => {
                    const dest = Destination.destinations.get(id);
                    if(dest){
                        dest.createDestinationInfo();
                    }
                })
            }
        }

        document.getElementById("remove-info").addEventListener('click', () => {
            info.style.display = "none";
        })
    }

}