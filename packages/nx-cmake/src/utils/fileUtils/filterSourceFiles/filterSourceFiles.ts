import { fileIsSourceFile } from '../fileIsSourceFile/fileIsSourceFile';

export const filterSourceFiles = (files: string[]) => {
    const sourceFiles = files.filter(fileIsSourceFile);
    return sourceFiles;
};
