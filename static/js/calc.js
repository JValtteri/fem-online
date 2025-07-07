/* fem-online
 * calc module
 * Contains all used math functions
 */

const pi=Math.pi;
const sqrt=Math.sqrt
const pow=Math.pow

export function calculateMass(length, a, dencity) {
    return length*a*dencity;
}

export function stretchDisplacement(force, length, youngs, a) {
    return force*length/youngs/a;
}

export function stretchStress(force, a) {
    return force/a;
}

export function stretchFrequency(dencity, youngs, a) {
    return 1/pi* sqrt(youngs*dencity*pow(a,2));
}

export function stretchStressFactor(stress, youngs) {
    return youngs/stress;
}


