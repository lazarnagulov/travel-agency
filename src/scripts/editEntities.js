import { User } from "../entities/User.js";
import { Destination } from "../entities/Destination.js";
import { updateAgency, updateDestination, updateUser } from "../scripts/firebase.js";
import { TravelAgency } from "../entities/TravelAgency.js";

const editUser = document.getElementById('e-user');
const editUserButton = document.getElementById("edit-user");

const confirmUser = document.getElementById("confirm-user");

const confirmDestination = document.getElementById("confirm-destination");
const exitDestination = document.getElementById("exit-destination");

const confirmAgency = document.getElementById("confirm-agency");

if(editUserButton){
    editUserButton.addEventListener('click', () => {
        const user = User.selectedUser;
        editUser.style.display = "flex";

        document.getElementById("e-username").value = user.username;
        document.getElementById("e-password").value = user.password;
        document.getElementById("e-name").value = user.name;
        document.getElementById("e-birth").value = user.birthDate;
        document.getElementById("e-surname").value = user.surname;
        document.getElementById("e-email").value = user.email;
        document.getElementById("e-address").value = user.address;
        document.getElementById("e-phonenumber").value = user.phoneNumber;
    });

    confirmUser.addEventListener('click', () => {
        const user = User.selectedUser;
        editUser.style.display = "none";

        user.username = document.getElementById("e-username").value;
        user.password = document.getElementById("e-password").value;
        user.name = document.getElementById("e-name").value;
        user.birthDate = document.getElementById("e-birth").value;
        user.surname = document.getElementById("e-surname").value;
        user.email = document.getElementById("e-email").value;
        user.address = document.getElementById("e-address").value;
        user.phoneNumber = document.getElementById("e-phonenumber").value;

        updateUser();
    })
}

if(confirmDestination){
    confirmDestination.addEventListener('click', () => {
        const dest = Destination.selectedDestination;
        document.getElementById("edit-destination").style.display = "none";
        dest.name = document.getElementById("e-destination-name").value;
        dest.description = document.getElementById("e-description").value;
        dest.type = document.getElementById("e-type").value;
        dest.typeOfTransport = document.getElementById("e-transport").value;
        dest.price = document.getElementById("e-price").value;
        dest.maxTravelers = document.getElementById("e-travelers").value;
        
        updateDestination();
    });

    exitDestination.addEventListener('click', () => {
        document.getElementById("edit-destination").style.display = "none";
    });

    confirmAgency.addEventListener('click', () => {
        const agency = TravelAgency.selectedAgency;
        agency.name = document.getElementById("e-name").value;
        agency.address = document.getElementById("e-address").value;
        agency.yearOfOpening = document.getElementById("e-year").value;
        agency.phoneNumber = document.getElementById("e-phonenumber").value;
        agency.email = document.getElementById("e-email").value;
        agency.logo = document.getElementById("e-logo").value;

        updateAgency();
    })
}


