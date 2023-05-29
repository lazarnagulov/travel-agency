import { User } from "../entities/User.js";

const editUser = document.getElementById('e-user');
const editUserButton = document.getElementById("edit-user");


editUserButton.addEventListener('click', () => {
    editUser.style.display = "flex";
    const user = User.selectedUser;

    document.getElementById("e-username").value = user.username;
    document.getElementById("e-password").value = user.password;
    document.getElementById("e-name").value = user.name;
    document.getElementById("e-birth").value = user.birthDate;
    document.getElementById("e-surname").value = user.surname;
    document.getElementById("e-email").value = user.email;
    document.getElementById("e-address").value = user.address;
})