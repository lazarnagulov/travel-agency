const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
const gridContainer = document.getElementsByClassName('grid-container')[0];
const toggleShowButton = document.getElementsByClassName('showmore-btn')[0];

toggleButton.addEventListener('click', () =>{
    navbarLinks.classList.toggle('active');
})

toggleShowButton.addEventListener('click', () => {
    if(gridContainer.style.display != "grid"){
        gridContainer.style.display = "grid";
        toggleShowButton.innerHTML = "<strong>Show less</strong>";
    }
    else{
        gridContainer.style.display = "none";
        toggleShowButton.innerHTML = "<strong>Show more</strong>";
    }
})
