export const getIncludeDirective = (
    isApp: boolean,
    moduleName: string,
    dirName: string
): string => {
    return isApp ? `"${moduleName}.h"` : `<${dirName}/include/${moduleName}.h>`;
};
