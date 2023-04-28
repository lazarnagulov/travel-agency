import { Error } from "./error.js";

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

document.getElementById("msg").innerHTML = msg;


