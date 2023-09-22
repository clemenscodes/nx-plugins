export const getEditFileInPlaceArgument = (
    editFilesInPlace: boolean,
): string[] => {
    return editFilesInPlace ? ['-i'] : [];
};
