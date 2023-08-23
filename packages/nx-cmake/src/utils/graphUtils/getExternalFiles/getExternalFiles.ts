export const getExternalFiles = (
    files: string[],
    libsDir: string
): string[] => {
    const externalDependentFiles = files.flatMap((file) => {
        const firstSegment = file.split('/').shift();
        if (firstSegment !== libsDir) {
            return [];
        }
        const f = libsDir + file.split(libsDir).pop();
        const [n] = f.split('.h');
        const name = n.replace('include', 'src');
        return [f, name + '.c', name + '.cpp'];
    });
    return externalDependentFiles;
};
