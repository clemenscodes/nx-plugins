export const fileIsSourceFile = (file: string): boolean => {
    const isCFile = file.endsWith('.c');
    const isCppFile = file.endsWith('.cpp');
    const isHFile = file.endsWith('.h');
    const isHppFile = file.endsWith('.hpp');
    const isSourceFile = isCFile || isCppFile || isHFile || isHppFile;
    return isSourceFile;
};
