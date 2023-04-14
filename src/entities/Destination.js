export class Destination
{
    static destinationsGroup = new Map();
    static destinations = new Map();

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

    static generateTable(){
        
    }

    createSlideShow(){
        
    }

    createDestinationInfo(){
        const info = document.getElementById("destination-info");
        info.innerHTML = 
            `
                <h2>${this.name}</h2>
                <div class = "slideshow-container">${createSlideShow()}</div>    
                <h4>
                    Description: ${this.description} <br>
                    Type: ${this.type} <br>
                    Transport: ${this.typeOfTransport} <br>
                    Price: ${this.price} <br>
                    Travelers: ${this.maxTravelers} <br>
                </h4>
            `
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
                console.error(`Destination ${id} does not exist!`);
            }
            ret += `<a id = ${id}>${dest.name}</a><br> `;
        }
        return ret.slice(0,-2);
    }

}