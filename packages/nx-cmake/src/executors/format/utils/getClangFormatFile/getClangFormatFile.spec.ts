import { getClangFormatFile } from './getClangFormatFile';
import * as fileExistsModule from '../../../../utils/fileUtils/fileExists/fileExists';

describe('getClangFormatFile', () => {
    const workspaceRoot = '/workspaceRoot';
    const projectRoot = '/projectRoot';
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        fileExistsMock.mockRestore();
    });

    it('should return the project clang format if it exists', async () => {
        fileExistsMock.mockResolvedValueOnce(true);
        const clangFormatFile = await getClangFormatFile(
            workspaceRoot,
            projectRoot
        );
        expect(clangFormatFile).toStrictEqual(
            `${workspaceRoot}/${projectRoot}/.clang-format`
        );
    });

    it('should return the workspace clang format if it exists but in project it doesnt', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(true);
        const clangFormatFile = await getClangFormatFile(
            workspaceRoot,
            projectRoot
        );
        expect(clangFormatFile).toStrictEqual(`${workspaceRoot}/.clang-format`);
    });

    it('should error if clang format file doesnt exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(false);
        await expect(
            getClangFormatFile(workspaceRoot, projectRoot)
        ).rejects.toThrowError(
            'Could not find .clang-format. Please generate a preset using nx-cmake:init or provide your own.'
        );
    });
});
