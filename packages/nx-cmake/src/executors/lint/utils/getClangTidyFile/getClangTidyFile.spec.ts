import { getClangTidyFile } from './getClangTidyFile';
import * as fileExistsModule from '../../../../utils/fileUtils/fileExists/fileExists';

describe('getClangTidyFile', () => {
    const workspaceRoot = '/workspaceRoot';
    const projectRoot = '/projectRoot';
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        fileExistsMock.mockRestore();
    });

    it('should return the project clang tidy if it exists', async () => {
        fileExistsMock.mockResolvedValueOnce(true);
        const clangTidyFile = await getClangTidyFile(
            workspaceRoot,
            projectRoot
        );
        expect(clangTidyFile).toStrictEqual(
            `${workspaceRoot}/${projectRoot}/.clang-tidy`
        );
    });

    it('should return the workspace clang format if it exists but in project it doesnt', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(true);
        const clangTidyFile = await getClangTidyFile(
            workspaceRoot,
            projectRoot
        );
        expect(clangTidyFile).toStrictEqual(`${workspaceRoot}/.clang-tidy`);
    });

    it('should error if clang tidy file doesnt exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(false);
        await expect(
            getClangTidyFile(workspaceRoot, projectRoot)
        ).rejects.toThrowError(
            'Could not find .clang-tidy. Please generate a preset using nx-cmake:init or provide your own.'
        );
    });
});
