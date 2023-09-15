import { fileIsSourceFile } from '../fileIsSourceFile/fileIsSourceFile';
import { CProjectType } from '../../../models/types';

export const filterSourceFiles = (
    workspaceRoot: string,
    projectRoot: string,
    projectType: CProjectType,
    files: string[]
) => {
    const sourceFiles = files.filter((file) =>
        fileIsSourceFile(workspaceRoot, projectRoot, projectType, file)
    );
    return sourceFiles;
};
