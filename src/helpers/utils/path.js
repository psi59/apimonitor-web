const webServiceIdRegExp = new RegExp(
    "\/services\/([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})"
);

export const getWebServiceId = () => {
    const parsedPath = webServiceIdRegExp.exec(window.location.pathname);
    if (parsedPath.length === 2 ) {
        return parsedPath[1]
    }
    return 0
};
