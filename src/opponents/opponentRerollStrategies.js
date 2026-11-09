export function shouldPeacockReroll(roll) {
    return roll === 1;
}

export function shouldDuckReroll(roll) {
    return roll === 1;
}

export function shouldMagpieReroll(roll){
    return roll !== 6;
}