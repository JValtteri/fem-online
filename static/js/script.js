import * as cookie from "./cookie.js"
import * as utils from "./utils.js"
import * as ui from "./ui.js"

const body = document.getElementById('body');


/*
 * Event Listeners
 */

/* Submit button
 */
ui.submitButton.addEventListener("click", () => {
    ui.submit();
});

/* Clear button
 */
ui.clearBtn.addEventListener("click", () => {
    ui.clear();
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        ui.submit();
    }
});

/* On Delete key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Delete") {
        ui.clear();
    }
});

/* Material selection changed
 */
ui.materialInput.addEventListener("change", () => {
    ui.update();
})

/* Any input value changed
 */
ui.lengthInput.addEventListener("change", ui.update);
ui.thicknessInput.addEventListener("change", ui.update);
ui.widthInput.addEventListener("change", ui.update);
ui.cavityThicknessInput.addEventListener("change", ui.update);
ui.cavityWidthInput.addEventListener("change", ui.update);
ui.forceInput.addEventListener("change", ui.update);

/* "Remember Me" clicked
 */
ui.cookieConsent.addEventListener('click', () => {
    if (cookieConsent.checked) {
        ui.cookie.setCookie("length", utils.base64(lengthInput.value), "");
    }
});

/* "Fullscreen" clicked
 */
ui.fullscreenBtn.addEventListener("click", () => {
    ui.toggleFullscreen();
})

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (ui.cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            ui.makeFullscreen();
        }
    }
});


/*
 * Run At Start
 */

// Check concent from cookie
if (cookie.getCookie("consent") === "true" ) {
    ui.cookieConsent.checked = true
}

// Auto search if concented
if (ui.cookieConsent.checked) {
    if (cookie.getCookie("fullscreen") === "true" ) {
        ui.makeFullscreen();
    }
    ui.cookieConsent.checked = true;
    ui.submit();
    ui.activateUI();
}

ui.update();
