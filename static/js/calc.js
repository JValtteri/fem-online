/* fem-online
 * calc module
 * Contains all used math functions
 */

const PI=Math.PI;
const sqrt=Math.sqrt
const pow=Math.pow

/*
 * General calculations
 */

export function calculateSection(thickness, width, inThickness=0, inWidth=0) {
    const section = (thickness*width)-(inThickness*inWidth);
    return section;
}

export function calculateAreaMoment(thickness, width, inThickness=0, inWidth=0) {
    const areaMoment = ( width*pow(thickness,3)-inWidth*pow(inThickness,3) )/12;
    return areaMoment;
}

export function calculateMass(length, section, dencity) {
    const mass = length*section*dencity/1000/1000/1000; // kg
    return mass;
}

/*
 * Specific calculations
 */

/*
 * Case 0
 */

export function stretchDisplacement(force, length, youngs, section) {
    const displacement = force*length/youngs/section
    return displacement;
}

export function stretchStress(force, section) {
    const stress = force/section
    return stress;
}

export function stretchFrequency(dencity, youngs, section) {
    const frequency = 1/(2*PI)*sqrt(youngs*dencity*pow(section,2));
    return frequency;
}

export function stretchStressFactor(stress, youngs) {
    const factor = youngs/stress;
    return factor;
}


