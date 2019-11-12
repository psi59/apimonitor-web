export const getFirstLetterOfDomain = (str) => {
    const h = str.split(".");
    const l = h.length;
    return String(h[l-2]).charAt(0);
};
