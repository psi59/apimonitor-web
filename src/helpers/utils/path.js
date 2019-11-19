const webServiceIdRegExp = new RegExp("\/services\/(\\d+)");

export const getWebServiceId = () => {
    const parsedPath = webServiceIdRegExp.exec(window.location.pathname);
    if (parsedPath.length === 2 ) {
        return parsedPath[1]
    }
    return 0
};
