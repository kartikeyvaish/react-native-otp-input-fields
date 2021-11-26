// Function for validating that a string is a valid Number/Digit or not.

function isValidDigit(str: string) {
    return /^\d+$/.test(str);
}

export default isValidDigit;