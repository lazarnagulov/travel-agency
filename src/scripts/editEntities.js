import { User } from "../entities/User.js";
import { Destination } from "../entities/Destination.js";
import { addDestination, updateAgency, updateDestination, updateUser } from "../scripts/firebase.js";
import { TravelAgency } from "../entities/TravelAgency.js";
import { validateAgency, validateDestination, validateUser } from "./validator.js";

const editUser = document.getElementById('e-user');
const editUserButton = document.getElementById("edit-user");

const confirmUser = document.getElementById("confirm-user");
const exitUser = document.getElementById("exit-edit-user")

const confirmDestination = document.getElementById("confirm-destination");
const exitDestination = document.getElementById("exit-destination");

const confirmAddDestination = document.getElementById("confirm-add-destination");
const exitAddDestination = document.getElementById("exit-add-destination");


const confirmAgency = document.getElementById("confirm-agency");



if(editUserButton){
    editUserButton.addEventListener('click', () => {
        const user = User.selectedUser;
        if(!user){
            document.getElementById("modal").style.display = "inline";
            document.getElementById("modal-confirm").innerText = "OK";
            document.getElementById("modal-cancel").style.display = "none";
            document.getElementById("modal-message").innerText = "Please select user!";

            document.getElementById("modal-confirm").addEventListener('click', () => {
                document.getElementById("modal").style.display = "";
            });       
            return;
        }
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

        if(!validateUser()){
            return;
        }
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
    });

    exitUser.addEventListener('click', () => {
        editUser.style.display = "none";
    });
}


if(confirmDestination){
    confirmDestination.addEventListener('click', () => {
        const dest = Destination.selectedDestination;
        if(!validateDestination("edit")){
            return;
        }
        document.getElementById("edit-destination").style.display = "none";
        dest.name = document.getElementById("e-destination-name").value;
        dest.description = document.getElementById("e-description").value;
        dest.type = document.getElementById("e-type").value;
        dest.typeOfTransport = document.getElementById("e-transport").value;
        dest.price = document.getElementById("e-price").value;
        dest.maxTravelers = document.getElementById("e-travelers").value;
        updateDestination();
    });

    exitAddDestination.addEventListener('click', () =>{
        document.getElementById("add-destination").style.display = "none";
    })

    confirmAddDestination.addEventListener('click', () => {
    
        if(!validateDestination("add")){
            return;
        }
        let dest = new Destination(
            null,
            document.getElementById("a-destination-name").value,
            document.getElementById("a-description").value,
            [document.getElementById("a-img").value],
            document.getElementById("a-type").value,
            document.getElementById("a-transport").value,
            document.getElementById("a-price").value,
            document.getElementById("a-travelers").value
        );
        document.getElementById("add-destination").style.display = "none";

        addDestination(dest);
    
    });

    exitDestination.addEventListener('click', () => {
        document.getElementById("edit-destination").style.display = "none";
    });

    confirmAgency.addEventListener('click', () => {
        const agency = TravelAgency.selectedAgency;
        if(!validateAgency()){
            return;
        }
        agency.name = document.getElementById("e-name").value;
        agency.address = document.getElementById("e-address").value;
        agency.yearOfOpening = document.getElementById("e-year").value;
        agency.phoneNumber = document.getElementById("e-phonenumber").value;
        agency.email = document.getElementById("e-email").value;
        agency.logo = document.getElementById("e-logo").value;

        updateAgency();
    });
}


