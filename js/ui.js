/*
 * UI elements amd high level UI functions
 */

import * as calc from "./calc.js"
import * as color from "./color.js"
import * as mat from "./material.js"

// Inputs
export const lengthInput          = document.getElementById('length');
export const thicknessInput       = document.getElementById('thickness');
export const widthInput           = document.getElementById('width');

export const cavityThicknessInput = document.getElementById('in-thickness');
export const cavityWidthInput     = document.getElementById('in-width');

export const forceInput           = document.getElementById('force2');

export const materialInput        = document.getElementById('material');

// Outputs
const outputs              = Array.from(document.getElementsByClassName("output"));
const factors              = Array.from(document.getElementsByClassName("factor"));
const mass                 = document.getElementById('mass');

const youngsmod            = document.getElementById("y-mod");
const yealdstr             = document.getElementById("y-strength");
const densityOut           = document.getElementById("density");

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

const buckle1out           = document.getElementById("buckle1");
const buckle1outfactor     = document.getElementById("buckle1-factor");
const buckle2out           = document.getElementById("buckle2");
const buckle2outfactor     = document.getElementById("buckle2-factor");
const buckle3out           = document.getElementById("buckle3");
const buckle3outfactor     = document.getElementById("buckle3-factor");
const buckle4out           = document.getElementById("buckle4");
const buckle4outfactor     = document.getElementById("buckle4-factor");

export const cookieConsent = document.getElementById('accept');

// Buttons
export const submitButton  = document.getElementById("submit-button");
export const clearBtn      = document.getElementById('clear-button');
export const fullscreenBtn = document.getElementById('fullscreen');


// Tables
const tables               = Array.from(document.getElementsByClassName("calculations"));

// Variables
let length          = lengthInput.value;
let thickness       = thicknessInput.value;
let width           = widthInput.value;
let cavityThickness = cavityThicknessInput.value;
let cavityWidth     = cavityWidthInput.value;

let force           = forceInput.value;

let section = 0;    // Crossection of the beam
let areamoment = 0; // a.k.a. I (mm^4)

// Selected material's features
var youngs = 0;
var yeald = 0;
var density = 0;


let calculated = false;

/* Toggle Fullscreen On or Off
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        makeFullscreen();
    } else {
        document.exitFullscreen();
        if (cookieConsent.checked === true) {
            cookie.setCookie("fullscreen", "");
        }
    }
}

/* Turn on Fullscreen
 */
export function makeFullscreen() {
    document.querySelector("body").requestFullscreen()
                                  .catch((TypeError) => {});
    if (cookieConsent.checked === true) {
        cookie.setCookie("fullscreen", "true", ttl*DAY);
    }
}

/* Updates all calculations
 */
export function update() {
    updateInputs();
    outputMaterialProperties();
    calculateBeamProperties();
    showMass();
    if (calculated) {
        color.removeColors(factors);         // Remove any old colors
        calculateStretch();
        calculateBend();
        calculateMidBend();
        calculateBucking();
        color.setColors(factors);       // Set new colors
    }
}

/* Used for the first time calculation
 * Activates the UI and
 * Updates all calculations
 */
export function submit() {
    calculated = true;
    activateUI();
    update();
}

/* Clear calculations
 */
export function clear() {
    clearOutputs();
    clearBtn.setAttribute("disabled", "");
    hideTables();
    calculated = false;
}


function showMass() {
    mass.innerText = calc.calculateMass(length, section, density).toFixed(3);
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

function activateUI() {
    clearBtn.removeAttribute("disabled");      // Enables a button
    showTables();
}

function updateInputs() {
    length          = lengthInput.value;
    thickness       = thicknessInput.value;
    width           = widthInput.value;
    cavityThickness = cavityThicknessInput.value;
    cavityWidth     = cavityWidthInput.value;
    force           = forceInput.value;
}

function getMaterialProperties(material) {
    return mat.materials[material];
}

function outputMaterialProperties() {
    const materialName = materialInput.value;
    const material = getMaterialProperties(materialName);
    // Update the internal variables
    youngs = material.youngs;
    yeald = material.yield;
    density = material.density;
    // Update the UI values
    youngsmod.innerText  = youngs.toFixed(1);
    yealdstr.innerText   = yeald.toFixed(0);
    densityOut.innerText = density.toFixed(0);
}

function calculateBeamProperties() {
    section         = calc.calculateSection(thickness, width, cavityThickness, cavityWidth);
    areamoment      = calc.calculateAreaMoment(thickness, width, cavityThickness, cavityWidth);
    sectionOut.innerText    = section.toFixed(0);
    areaMomentOut.innerText = areamoment.toFixed(0);
}

function calculateStretch() {
    const displacement = calc.stretchDisplacement(force, length, youngs, section);
    const stress       = calc.stretchStress(force, section);
    const frequency    = calc.stretchFrequency(density, youngs, section);
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
    const frequency    = calc.bendFrequency(length, density, youngs, areamoment, section).toFixed(1);
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
    const frequency    = calc.midFrequency(length, density, youngs, areamoment, section).toFixed(1);
    const stressFactor = calc.stressFactor(stress, yeald).toFixed(1);
    const shearFactor  = calc.stressFactor(shear, yeald).toFixed(1);
    case2sigma.innerText       = stress;
    case2sigmafactor.innerText = stressFactor;
    case2shear.innerText       = shear;
    case2shearfactor.innerText = shearFactor;
    case2yeald.innerText       = displacement;
    case2hz.innerText          = frequency;
}

function calculateBucking() {
    const buckle1       = calc.bucklingMode1(length, youngs, areamoment).toFixed(0);
    const buckle2       = calc.bucklingMode2(length, youngs, areamoment).toFixed(0);
    const buckle3       = calc.bucklingMode3(length, youngs, areamoment).toFixed(0);
    const buckle4       = calc.bucklingMode4(length, youngs, areamoment).toFixed(0);
    const buckle1factor = calc.stressFactor(force, buckle1).toFixed(2);
    const buckle2factor = calc.stressFactor(force, buckle2).toFixed(2);
    const buckle3factor = calc.stressFactor(force, buckle3).toFixed(2);
    const buckle4factor = calc.stressFactor(force, buckle4).toFixed(2);
    buckle1out.innerText       = buckle1;
    buckle1outfactor.innerText = buckle1factor;
    buckle2out.innerText       = buckle2;
    buckle2outfactor.innerText = buckle2factor;
    buckle3out.innerText       = buckle3;
    buckle3outfactor.innerText = buckle3factor;
    buckle4out.innerText       = buckle4;
    buckle4outfactor.innerText = buckle4factor;
}

function clearOutputs() {
    outputs.forEach(element => {
        element.innerText = '';
    });
}
