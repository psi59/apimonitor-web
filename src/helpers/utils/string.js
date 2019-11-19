export const getFirstLetterOfDomain = (str) => {
    if (str === undefined || str === '') {
        return ''
    }
    const h = str.split(".");
    const l = h.length;
    return String(h[l-2]).charAt(0);
};
