import { Destination  } from "./Destination.js";

export class TravelAgency
{
    static agencies = new Map();
    static headers = ["ID", "Name", "Address", "Year", "Phone number", "Email", "Destination"]

    static selectedAgency;

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
           

            //"ID", "Name", "Address", "Year", "Phone number", "Email", "Destination"
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
                row.style.backgroundColor = "white";
                TravelAgency.selectedAgency = row.children[0]
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
        }

        
    }
    createCard(){
        return(
            `
                <div class="agency"> 
                    <img src="${this.logo}" alt="${this.name + ".jpg"}" referrerpolicy="no-referrer">
                    <h3>${this.name}</h3>
                    <a href="#agency-info" class="btn" id = ${this.id}>Read more</a>
                </div>
            `
        )
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
            <div class = "info-text">
                <p>
                    Address: ${this.address} <br>
                    Year: ${this.yearOfOpening} <br>
                    Phone number: ${this.phoneNumber} <br>   
                    Email: ${this.email} <br>
                    Destinations: <br>
                </p>
                <div class = "destinations">
                    ${destinations}
                </div>
                <a href = "#" id = "remove-info">Show less</a>
            </div>
        `

        const children = document.getElementsByClassName("destinations")[0].children

        for(let i = 0; i < children.length; ++i){
            const id = children[i].getAttribute("id");
            if(id){
                document.getElementById(id).addEventListener('click', () =>{
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