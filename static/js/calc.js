/* fem-online
 * calc module
 * Contains all used math functions
 */

const PI=Math.PI;
const sqrt=Math.sqrt
const pow=Math.pow

var buckleforce = 0;

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

export function calculateMass(length, section, density) {
    const mass = length*section*density/1000/1000/1000; // kg
    return mass;
}

/*
 * Specific calculations
 */

export function stressFactor(stress, youngs) {
    const factor = youngs/stress;
    return factor;
}

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

export function stretchFrequency(density, youngs, section) {
    const frequency = 1/(2*PI)*sqrt(youngs*density*pow(section,2));
    return frequency;
}

/*
 * Case 1: Bending (end)
 */

export function bendDisplacement(force, length, youngs, areamoment) {
    const displacement = force*pow(length, 3)/3/youngs/areamoment;
    return displacement;
}

export function bendStress(force, length, thickness, areamoment) {
    const stress = length*force*(thickness/2)/areamoment;
    return stress;
}

export function bendShear(force, section) {
    const shear = force/section;
    return shear;
}

export function bendFrequency(length, density, youngs, areamoment, section) {
    const frequency = 1/(2*PI)*pow(1,875,2)/pow(length,2)*sqrt(youngs*1000*areamoment/(density*section))*pow(10,6);
    return frequency;
}

/*
 * Case 2: Bending (middle)
 */

export function midDisplacement(force, length, youngs, areamoment) {
    const displacement = force*pow(length, 3)/48/youngs/areamoment;
    return displacement;
}

export function midStress(force, length, thickness, areamoment) {
    const stress = 1/2*length*force/2*(thickness/2)/areamoment;
    return stress;
}

export function midShear(force, section) {
    const shear = force/section/2;
    return shear;
}

export function midFrequency(length, density, youngs, areamoment, section) {
    const frequency = 1/(2*PI)*pow(4,694,2)/pow(length,2)*sqrt(youngs*1000*areamoment/(density*section))*pow(10,6);
    return frequency;
}

/*
 * Case Buckling Modes
 */

export function bucklingMode1(length, youngs, areamoment) {
    buckleforce = pow(PI,2)*youngs*areamoment/length;
    const force = buckleforce/2;
    return force;
}

export function bucklingMode2(length, youngs, areamoment) {
    const force = buckleforce;
    return force;
}

export function bucklingMode3(length, youngs, areamoment) {
    const force = buckleforce/0.699;
    return force;
}

export function bucklingMode4(length, youngs, areamoment) {
    const force = buckleforce/0.5;
    return force;
}



