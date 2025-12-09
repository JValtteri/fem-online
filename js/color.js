/* fem-online
 * color module
 */

export function removeColors(elements) {
    elements.forEach(element => {
        element.classList.remove('red');
        element.classList.remove('yellow');
        element.classList.remove('green');
        element.classList.remove('dark-green');
        element.classList.remove('blue');
    });
}

export function setColors(elements) {
    elements.forEach(element => {
        if (element.textContent >= 10) {
            makeBlue(element);
        } else if (element.textContent > 5) {
            makeDarkGreen(element);
        } else if (element.textContent > 2) {
            makeGreen(element);
        } else if (element.textContent >= 1) {
            makeYellow(element);
        } else {
            makeRed(element);
        }
    });
}

function makeRed(element) {
    element.classList.add('red');
}

function makeYellow(element) {
    element.classList.add('yellow');
}

function makeGreen(element) {
    element.classList.add('green');
}

function makeDarkGreen(element) {
    element.classList.add('dark-green');
}

function makeBlue(element) {
    element.classList.add('blue');
}
