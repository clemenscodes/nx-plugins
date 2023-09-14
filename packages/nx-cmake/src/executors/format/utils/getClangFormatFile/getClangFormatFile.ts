import { fileExists } from '../../../../utils/commandUtils/fileExists/fileExists';

export const getClangFormatFile = async (
    workspaceRoot: string,
    projectRoot: string
) => {
    const clangFormatFile = '.clang-format';
    const projectClangFormatFile = `${workspaceRoot}/${projectRoot}/${clangFormatFile}`;
    const workspaceClangFormatFile = `${workspaceRoot}/${clangFormatFile}`;

    const projectClangFormatFileExists = await fileExists(
        projectClangFormatFile
    );
    const workspaceClangFormatFileExists = await fileExists(
        workspaceClangFormatFile
    );

    if (projectClangFormatFileExists) {
        return projectClangFormatFile;
    }

    if (workspaceClangFormatFileExists) {
        return workspaceClangFormatFile;
    }

    throw new Error(
        'Could not find .clang-format. Please generate a preset using nx-cmake:init or provide your own.'
    );
};
