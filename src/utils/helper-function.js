const removeExtraSpaces = (value) => {
    return value.replace(/\s+/g, ' ');
}

const replaceTrimLower = (value) => {
    return removeExtraSpaces(value).trim().toLowerCase();
}

const replaceTrimUpper = (value) => {
    return removeExtraSpaces(value).trim().toUpperCase();
}

module.exports = {
    removeExtraSpaces,
    replaceTrimLower,
    replaceTrimUpper
}