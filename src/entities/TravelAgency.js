import { Destination  } from "./Destination.js";
import { Error } from "../scripts/error.js";
import { deleteAgency } from "../scripts/firebase.js";

export class TravelAgency{
    static agencies = new Map();
    static headers = ["Name", "Address", "Year", "Phone number", "Email"]

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
            let text = document.createTextNode(agency.name);
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

            row.addEventListener('click', () => {
                row.style.backgroundColor = "aqua";
                TravelAgency.selectedRow = row;
                TravelAgency.selectedAgency = TravelAgency.agencies.get(row.getAttribute("id"));
                for(let r of table.rows){
                    if(r != row){
                        r.style.backgroundColor = "";
                    }
                }
            })
        }

        

        document.getElementById("delete-agency").addEventListener('click', () => {
            document.getElementById("modal").style.display = "inline";
            
            if(!TravelAgency.selectedAgency){
                document.getElementById("modal-confirm").innerText = "OK";
                document.getElementById("modal-cancel").style.display = "none";
                document.getElementById("modal-message").innerText = "Please select agency!";
                document.getElementById("modal-confirm").addEventListener('click', () =>{
                    document.getElementById("modal").style.display = "";
                });       
                return;
            }
            document.getElementById("modal-confirm").innerText = "Yes";
            document.getElementById("modal-cancel").innerText = "No";
            document.getElementById("modal-message").innerText = `Are you sure you want to delete ${TravelAgency.selectedAgency.name}?`;
            document.getElementById("modal-confirm").addEventListener('click', () =>{
                deleteAgency()
            });       
            document.getElementById("modal-cancel").addEventListener('click', () =>{
                document.getElementById("modal").style.display = "";
            });       
        });

        document.getElementById("edit-agency").addEventListener('click', () => {
            if(!TravelAgency.selectedAgency){
                document.getElementById("modal").style.display = "inline";
                document.getElementById("modal-confirm").innerText = "OK";
                document.getElementById("modal-cancel").style.display = "none";
                document.getElementById("modal-message").innerText = "Please select agency!";

                document.getElementById("modal-confirm").addEventListener('click', () =>{
                    document.getElementById("modal").style.display = "";
                });       
                return;
            }
            window.location.replace(`./editAgency.html?id=${TravelAgency.selectedAgency.id}`);
        });

        document.getElementById("add-agency").addEventListener('click', () => {
            window.location.replace(`./error.html?msg=${Error.NOT_IMPLEMENTED.name}`);
        });
        
    }

    static createCards(){
        const agenciesContainer = document.getElementById("agencies-container");
        agenciesContainer.innerHTML = "";
        if(!agenciesContainer){
            return;
        }
        for(let [_, agency] of TravelAgency.agencies){
            let card = 
            `
                <div class="agency" id = "card${agency.id}"> 
                    <img src="${agency.logo}" alt="${agency.name + ".jpg"}" referrerpolicy="no-referrer">
                    <h3>${agency.name}</h3>
                    <a href="./agency.html?id=${agency.id}" class="btn" id = ${agency.id}>More info</a><br><br>
                    <strong>Destinations:</strong>
                    <div class = "card-destinations">${Destination.getDestinationsFromGroup(agency.destinations)}</div>
                </div>
            `
            agenciesContainer.innerHTML += card;
        }
    }

    createAgencyInfo(){
        const info = document.getElementById("agency-info");
        const destinations = Destination.destinationsGroup.get(this.destinations);
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
                    <section class = "search">
                        <img id = "search-img" src = "./img/search.png" >
                        <form class = "search-options" id = "search-options">
                            <input placeholder = "Name" type = "text" id = "dest-name">
                            <label for="search-type">Type:</label>
                            <select name="type" id="search-type">
                                <option value=""></option>
                                <option value="Zimovanje">Wintering</option>
                                <option value="Letovanje">Summer Vacation</option>
                                <option value="Gradovi Evrope">Europe cities</option>
                            </select>
                            <label for="search-transport">Transport:</label>
                            <select name="transport" id="search-transport">
                                <option value=""></option>
                                <option value="avion">Airplane</option>
                                <option value="autobus">Autobus</option>
                                <option value="sopstveni">Own transport</option>
                            </select>
                            <button type = "button" class = "popup-btn" id = "destination-search-btn">Search</button>
                        </form>
                    </section>    
                </p>
                <div id = "destinations"></div>
            </div>
        `
        document.getElementById("destination-search-btn").addEventListener("click", () => {
            Destination.createDestinationCards(Destination.destinationsGroup.get(TravelAgency.selectedAgency.destinations));

            const destinationName = document.getElementById("dest-name").value;
            const transport = document.getElementById("search-transport").value;
            const type = document.getElementById("search-type").value;

            const destinationNameRegex = new RegExp(`(${destinationName.toLowerCase()})(?!([^<]+)?>)`, "gi");
            const transportRegex = new RegExp(`(${transport.toLowerCase()})(?!([^<]+)?>)`, "gi");
            const typeRegex = new RegExp(`(${type.toLowerCase()})(?!([^<]+)?>)`, "gi");
            const destinationGroup = Destination.destinationsGroup.get(TravelAgency.selectedAgency.destinations);

            let destinationFound = [];

            if(!(destinationName || transport || type)){
                for(let id of destinationGroup){
                    document.getElementById(id).style.display = "";
                }
                return;
            }

            if(destinationName){
                for(let id of destinationGroup){
                    let destination = Destination.destinations.get(id);
                    let name = destination.name.toLowerCase();
                    if(!name.includes(destinationName.toLowerCase())){
                        document.getElementById(id).style.display = "none";
                        continue;
                    }
                    document.getElementById(id).style.display = "";
                    destinationFound.push(id);
                }
            }else{
                destinationFound = destinationGroup;
            }

            let transportFound = [];

            if(transport){
                for(let id of destinationFound){
                    let destinationTransport = Destination.destinations.get(id).typeOfTransport;
                    if(destinationTransport.toLowerCase() != transport.toLowerCase()){
                        document.getElementById(id).style.display = "none";
                        continue;
                    }
                    document.getElementById(id).style.display = "";
                    transportFound.push(id);
                }
            }else{
                transportFound = destinationFound;
            }

            let found = [];

            if(type){
                for(let id of transportFound){
                    let destinationType = Destination.destinations.get(id).type;
                    if(destinationType.toLowerCase() != type.toLowerCase()){
                        document.getElementById(id).style.display = "none";
                        continue;
                    }
                    document.getElementById(id).style.display = "";
                    found.push(id);
                }
            }else{
                found = transportFound;
            }

            for(let id of found){
                let name = document.getElementById(id).getElementsByTagName("h4")[0];
                let text = name.innerHTML;
                let checker = text.slice().toLowerCase();
                if(destinationName && checker.includes(destinationName.toLowerCase())){
                    let n = destinationName.toUpperCase();
                    let replaced = text.replace(destinationNameRegex, `<mark>${n}</mark>`);
                    name.innerHTML = replaced;
                }
                
                let typeParagraph = document.getElementById(id).getElementsByTagName("p")[0];
                if(type){
                    text = typeParagraph.innerHTML;
                    checker = text.slice().toLowerCase();
                    if(checker.includes(type.toLowerCase())){
                        let t = type.toUpperCase();
                        let replaced = text.replace(typeRegex, `<mark>${t}</mark>`);
                        typeParagraph.innerHTML = replaced;
                    }
                }   
                if(transport){
                    text = typeParagraph.innerHTML;
                    checker = text.slice().toLowerCase();
                    if(checker.includes(transport.toLowerCase())){
                        let t = transport.toUpperCase();
                        let replaced = text.replace(transportRegex, `<mark>${t}</mark>`);
                        typeParagraph.innerHTML = replaced;
                    }
                }
          }
        });
        document.getElementById("search-img").addEventListener('click', () => {
            const searchOptions = document.getElementById("search-options"); 
            searchOptions.style.display = searchOptions.style.display == "none" || searchOptions.style.display == "" ? "flex" : "none"; 
        });

        Destination.createDestinationCards(destinations);
    }
}