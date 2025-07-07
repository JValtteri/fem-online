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

const forceInput           = document.getElementById('force2');

// Outputs
const outputs              = Array.from(document.getElementsByClassName("output"));
const mass                 = document.getElementById('mass');

const youngsmod            = document.getElementById("y-mod");
const yealdstr             = document.getElementById("y-strength");
const dencityOut           = document.getElementById("dencity");

const sectionOut           = document.getElementById("section");
const areaMomentOut        = document.getElementById("areaMoment");

const case0sigma           = document.getElementById("case0sigma");
const case0sigmafactor     = document.getElementById("case0sigma-factor");
const case0yeald           = document.getElementById("case0y");
const case0hz              = document.getElementById("case0hz");

const case1sigma           = document.getElementById("case1sigma");
const case1sigmafactor     = document.getElementById("case1sigma-factor");
const case1shear           = document.getElementById("case1q");
const case1shearfactor     = document.getElementById("case1q-factor");
const case1yeald           = document.getElementById("case1y");
const case1hz              = document.getElementById("case1hz");

const case2sigma           = document.getElementById("case2sigma");
const case2sigmafactor     = document.getElementById("case2sigma-factor");
const case2shear           = document.getElementById("case2q");
const case2shearfactor     = document.getElementById("case2q-factor");
const case2yeald           = document.getElementById("case2y");
const case2hz              = document.getElementById("case2hz");

const cookieConsent        = document.getElementById('accept');

// Tables
const tables               = Array.from(document.getElementsByClassName("calculations"));

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
    showTables();
}

function clearAll() {
    outputs.forEach(element => {
        element.innerText = '';
    });
}

function showTables() {
    tables.forEach(element => {
        element.removeAttribute("hidden");
    });
}

function hideTables() {
    tables.forEach(element => {
        element.setAttribute("hidden", "")
    });
}

function updateInputs() {
    length          = lengthInput.value;
    thickness       = thicknessInput.value;
    width           = widthInput.value;
    cavityThickness = cavityThicknessInput.value;
    cavityWidth     = cavityWidthInput.value;
    force           = forceInput.value;
}

function calculateMass() {
    mass.innerText = calc.calculateMass(length, section, dencity).toFixed(3) + " kg";
}

function outputMaterialProperties() {
    youngsmod.innerText  = youngs.toFixed(1);
    yealdstr.innerText   = yeald.toFixed(0);
    dencityOut.innerText = dencity.toFixed(0);
}

function calculateBeamProperties() {
    section         = calc.calculateSection(thickness, width, cavityThickness, cavityWidth);
    areamoment      = calc.calculateAreaMoment(thickness, width, cavityThickness, cavityWidth);
    sectionOut.innerText    = section.toFixed(0);
    areaMomentOut.innerText = areamoment.toFixed(0);
}

async function submitCalculation() {
    activateUI();
    updateInputs();
    outputMaterialProperties();
    calculateBeamProperties();
    calculateMass();
    calculateStretch();
    calculateBend();
    calculateMidBend();
}

function calculateStretch() {
    const displacement = calc.stretchDisplacement(force, length, youngs, section);
    const stress       = calc.stretchStress(force, section);
    const frequency    = calc.stretchFrequency(dencity, youngs, section);
    const stressFactor = calc.stressFactor(stress, yeald);

    case0yeald.innerText = displacement.toFixed(1);
    case0sigma.innerText = stress.toFixed(1);
    case0hz.innerText    = frequency.toFixed(1);
    case0sigmafactor.innerText = stressFactor.toFixed(1);
}

function calculateBend() {
    const displacement = calc.bendDisplacement(force, length, youngs, areamoment).toFixed(1);
    const stress       = calc.bendStress(force, length, thickness, areamoment).toFixed(1);
    const shear        = calc.bendShear(force, section).toFixed(1);
    const frequency    = calc.bendFrequency(length, dencity, youngs, areamoment, section).toFixed(1);
    const stressFactor = calc.stressFactor(stress, yeald).toFixed(1);
    const shearFactor  = calc.stressFactor(shear, yeald).toFixed(1);

    case1sigma.innerText       = stress;
    case1sigmafactor.innerText = stressFactor;
    case1shear.innerText       = shear;
    case1shearfactor.innerText = shearFactor;
    case1yeald.innerText       = displacement;
    case1hz.innerText          = frequency;
}

function calculateMidBend() {
    const displacement = calc.midDisplacement(force, length, youngs, areamoment).toFixed(1);
    const stress       = calc.midStress(force, length, thickness, areamoment).toFixed(1);
    const shear        = calc.midShear(force, section).toFixed(1);
    const frequency    = calc.midFrequency(length, dencity, youngs, areamoment, section).toFixed(1);
    const stressFactor = calc.stressFactor(stress, yeald).toFixed(1);
    const shearFactor  = calc.stressFactor(shear, yeald).toFixed(1);

    case2sigma.innerText       = stress;
    case2sigmafactor.innerText = stressFactor;
    case2shear.innerText       = shear;
    case2shearfactor.innerText = shearFactor;
    case2yeald.innerText       = displacement;
    case2hz.innerText          = frequency;
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
    clearBtn.setAttribute("disabled", "");
    hideTables();
});

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            makeFullscreen();
        }
    }
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        activateUI()
        submitCalculation();
    }
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Delete") {
        clearAll();
        clearBtn.setAttribute("disabled", "");
        hideTables();
    }
});


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
