//import * as table from "./table.js"
import * as cookie from "./cookie.js"
import * as calc from "./calc.js"

const body                 = document.getElementById('body');
// Inputs
const lengthInput          = document.getElementById('length');
const thicknessInput       = document.getElementById('thickness');
const widthInput           = document.getElementById('width');

const cavityThicknessInput = document.getElementById('in-thickness');
const cavityWidthInput     = document.getElementById('in-width');

//const forceInput           = document.getElementById('force1');
const forceInput           = document.getElementById('force2');
const momentInput          = document.getElementById('moment');
const materialInput        = document.getElementById('moment');

// Outputs
const outputs              = document.getElementsByClassName("output");
const mass                 = document.getElementById('mass');

const youngsmod            = document.getElementById("y-mod");
const yealdstr             = document.getElementById("y-strength");
const dencityOut           = document.getElementById("dencity");

const case0sigma           = document.getElementById("case0sigma");
const case0sigmafactor     = document.getElementById("case0sigma-factor");
const case0yeald           = document.getElementById("case0y");
const case0hz              = document.getElementById("case0hz");

const cookieConsent        = document.getElementById('accept');

// Tables
const case1table           = document.getElementById("case1");
const case2table           = document.getElementById("case2");

// Titles
// Json Data

// Variables
let length          = lengthInput.value;
let thickness       = thicknessInput.value;
let width           = widthInput.value;
let cavityThickness = cavityThicknessInput.value;
let cavityWidth     = cavityWidthInput.value;
let force           = forceInput.value;

let section = 0;    // Crossection of the beam
let areamoment = 0; // a.k.a. I (mm^4)

// Hard coded material
const youngs = 3.5;
const yeald = 35;
const dencity = 1240; // g/m^3


/* Converts str to Base64, via uint8
 */
function base64(str) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}

function activateUI() {
    clearBtn.removeAttribute("disabled");      // Enables a button
    //someTitle.setAttribute("hidden", "");        // Hide a title
}

function clearAll() {
    outputs.innerText = '';
    /*
    mass.value       = '';
    youngsmod.value  = '';
    yealdstr.value   = '';
    dencity.value    = '';
    case0sigma       = '';
    case0sigmafactor = '';
    case0yeald       = '';
    case0hz          = '';
    */
}

function updateInputs() {
    length          = lengthInput.value;
    thickness       = thicknessInput.value;
    width           = widthInput.value;
    cavityThickness = cavityThicknessInput.value;
    cavityWidth     = cavityWidthInput.value;
    force           = forceInput.value;

    section         = calc.calculateSection(thickness, width, cavityThickness, cavityWidth);
    areamoment      = calc.calculateAreaMoment(thickness, width, cavityThickness, cavityWidth);
}

function calculateMass() {
    mass.innerText = calc.calculateMass(length, section, dencity);
}

function outputMaterialProperties() {
    youngsmod.innerText  = youngs;
    yealdstr.innerText   = yeald;
    dencityOut.innerText = dencity;
}

async function submitCalculation() {
    activateUI();
    updateInputs();
    calculateMass();
    calculateStretch();
    calculateBend();
    calculateMidBend();
}

function calculateStretch() {
    const displacement = calc.stretchDisplacement(force, length, youngs, section);
    const stress       = calc.stretchStress(force, section);
    const frequency    = calc.stretchFrequency(dencity, youngs, section);
    const stressFactor = calc.stretchStressFactor(stress, youngs);

    case0yeald.innerText = displacement;
    case0sigma.innerText = stress;
    case0hz.innerText    = frequency;
    case0sigmafactor.innerText = stressFactor;
}

function calculateBend() {
}

function calculateMidBend() {
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        makeFullscreen();
    } else {
        document.exitFullscreen();
        if (cookieConsent.checked === true) {
            cookie.setCookie("fullscreen", "");
        }
    }
}

function makeFullscreen() {
    document.querySelector("body").requestFullscreen()
                                  .catch((TypeError) => {});
    if (cookieConsent.checked === true) {
        cookie.setCookie("fullscreen", "true", ttl*DAY);
    }
}

/*
 * Buttons and Events
 */

// Buttons
const submitButton  = document.getElementById("submit-button");
const clearBtn      = document.getElementById('clear-button');
const fullscreenBtn = document.getElementById('fullscreen');

/* Submit button
 */
submitButton.addEventListener("click", () => {
    submitCalculation();
});

/* Clear button
 */
clearBtn.addEventListener("click", () => {
    clearAll();
});

/* Search on Enter key
 */
/*
cityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        submitCalculation();
    }
});
*/

/* "Remember Me" clicked
 */
cookieConsent.addEventListener('click', () => {
    if (cookieConsent.checked) {
        cookie.setCookie("length", base64(lengthInput.value), "");
    }
});

/* "Fullscreen" clicked
 */
fullscreenBtn.addEventListener("click", () => {
    toggleFullscreen();
})

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            makeFullscreen();
        }
    }
});

// Check concent from cookie
if (cookie.getCookie("consent") === "true" ) {
    cookieConsent.checked = true
}

// Auto search if concented
if (cookieConsent.checked) {
    if (cookie.getCookie("fullscreen") === "true" ) {
        makeFullscreen();
    }
    cookieConsent.checked = true;
    submitCalculation();
    activateUI();
}
