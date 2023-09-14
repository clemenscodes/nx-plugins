import { fileExists } from '../../../../utils/fileUtils/fileExists/fileExists';

export const getClangTidyFile = async (
    workspaceRoot: string,
    projectRoot: string
) => {
    const clangTidyFile = '.clang-tidy';
    const projectClangTidyFile = `${workspaceRoot}/${projectRoot}/${clangTidyFile}`;
    const workspaceClangTidyFile = `${workspaceRoot}/${clangTidyFile}`;

    const projectClangTidyFileExists = await fileExists(projectClangTidyFile);
    const workspaceClangTidyFileExists = await fileExists(
        workspaceClangTidyFile
    );

    if (projectClangTidyFileExists) {
        return projectClangTidyFile;
    }

    if (workspaceClangTidyFileExists) {
        return workspaceClangTidyFile;
    }

    throw new Error(
        `Could not find ${clangTidyFile}. Please generate a preset using nx-cmake:init or provide your own.`
    );
};
