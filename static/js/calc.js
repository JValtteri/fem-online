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

export function stretchFrequency(dencity, youngs, section) {
    const frequency = 1/(2*PI)*sqrt(youngs*dencity*pow(section,2));
    return frequency;
}

/*
 * Case 1
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

export function bendFrequency(length, dencity, youngs, areamoment, section) {
    const frequency = 1/(2*PI)*pow(1,875,2)/pow(length,2)*sqrt(youngs*1000*areamoment/(dencity*section))*pow(10,6);
    return frequency;
}


