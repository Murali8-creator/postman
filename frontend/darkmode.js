import {id} from './script.js';


const toggleOff = id("toggle-off");
const htmlElement = document.querySelector("html");
const themeValue = htmlElement.getAttribute("data-bs-theme");
const navBarElement = id("navBar");



let isDarkmodeEnabled = false;
//toggle-on will be hidden first since it will be in light mode
const toggleOn = id("toggle-on");
toggleOn.style.display = "none";


const enableDarkMode = () => {
    htmlElement.setAttribute("data-bs-theme","dark");
        isDarkmodeEnabled = true;
        navBarElement.setAttribute("data-bs-theme","light");
}

const disableDarkMode = () => {
    htmlElement.setAttribute("data-bs-theme","light");
    isDarkmodeEnabled = false;
    navBarElement.setAttribute("data-bs-theme","dark");
}


toggleOff.addEventListener("click",() => {
    console.log("toggle clicked");
    //if dark mode is enabled turn it off
    if(isDarkmodeEnabled){
       disableDarkMode();
    }
    else{
        enableDarkMode();
    }
    toggleOff.style.display = "none";
    toggleOn.style.display = "block";
})

toggleOn.addEventListener("click",() => {
    console.log("toggle clicked");
    //if dark mode is enabled turn it off
    if(isDarkmodeEnabled){
       disableDarkMode();
    }
    else{
        enableDarkMode();
    }
    toggleOn.style.display = "none";
    toggleOff.style.display = "block";
})