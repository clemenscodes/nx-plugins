import { getProjectFiles } from './getProjectFiles';
import * as getAbsolutePathModule from '../getAbsolutePath/getAbsolutePath';
import * as getFilesOfDirectoryRecursivelyModule from '../getFilesOfDirectoryRecursively/getFilesOfDirectoryRecursively';

describe('getProjectFiles', () => {
    let getAbsolutePathMock: jest.SpyInstance;
    let getFilesOfDirectoryRecursivelyMock: jest.SpyInstance;

    beforeEach(() => {
        getAbsolutePathMock = jest.spyOn(
            getAbsolutePathModule,
            'getAbsolutePath'
        );
        getFilesOfDirectoryRecursivelyMock = jest.spyOn(
            getFilesOfDirectoryRecursivelyModule,
            'getFilesOfDirectoryRecursively'
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array when given empty workspaceRoot and projectRoot', () => {
        getAbsolutePathMock.mockReturnValue('');
        getFilesOfDirectoryRecursivelyMock.mockReturnValue([]);

        const result = getProjectFiles('', '');

        expect(result).toEqual([]);
        expect(getAbsolutePathMock).not.toHaveBeenCalled();
        expect(getFilesOfDirectoryRecursivelyMock).not.toHaveBeenCalled();
    });

    it('should return an array of project files', () => {
        const workspaceRoot = '/workspaceRoot';
        const projectRoot = '/projectRoot';
        const fullProjectRoot = `${workspaceRoot}${projectRoot}`;
        const projectFiles = ['/projectFile1.txt', '/projectFile2.txt'];

        getAbsolutePathMock.mockReturnValue(fullProjectRoot);
        getFilesOfDirectoryRecursivelyMock.mockReturnValue(projectFiles);

        const result = getProjectFiles(workspaceRoot, projectRoot);

        expect(result).toEqual(projectFiles);
        expect(getAbsolutePathMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot
        );
        expect(getFilesOfDirectoryRecursivelyMock).toHaveBeenCalledWith(
            fullProjectRoot
        );
    });
});
