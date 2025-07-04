import * as table from "./table.js"
import * as cookie from "./cookie.js"

const body                 = document.getElementById('body');
// Inputs
const lengthInput          = document.getElementById('length');
const thicknessInput       = document.getElementById('thickness');
const widthInput           = document.getElementById('width');

const cavityThicknessInput = document.getElementById('in-thickness');
const cavityWidthInput     = document.getElementById('in-width');

const forceInput           = document.getElementById('force');
const momentInput          = document.getElementById('moment');
const materialInput        = document.getElementById('moment');

const cookieConsent        = document.getElementById('accept');
// Tables
const case1table           = document.getElementById("case1");
const case2table           = document.getElementById("case2");
// Titles
// Json Data

/* Converts str to Base64, via uint8
 */
function base64(str) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}

function activateUI() {
    someButton.removeAttribute("disabled");      // Enables a button
    someTitle.setAttribute("hidden", "");        // Hide a title
}

/* Sends sets the city name for weather request
 */
async function submitCalculation() {
    if (cityInput.value && cityInput.value != "City") {
        if (cookieConsent.checked) {
            cookie.setCookie("length", base64(lengthInput.value), ttl*DAY);
        }
        let ok = await fetchWeatherData();
        if (ok === true) {
            activateUI();
        }
    }
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

/* Submit button
 */
submitButton.addEventListener("click", () => {
    submitCalculation();
});

/* Clear button
 */
reloadBtn.addEventListener("click", () => {
    clearPage();
});

/* Search on Enter key
 */
cityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        submitCalculation();
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
    if (ok === true) {
        activateUI();
    }
}
