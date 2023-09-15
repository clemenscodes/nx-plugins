import { getNestedFiles } from './getNestedFiles';
import * as pathIsDirectoryModule from '../pathIsDirectory/pathIsDirectory';
import * as getFilesOfDirectoryRecursivelyModule from '../getFilesOfDirectoryRecursively/getFilesOfDirectoryRecursively';

describe('pathIsDirectory', () => {
    let pathIsDirectoryMock: jest.SpyInstance;
    let getFilesOfDirectoryRecursivelyMock: jest.SpyInstance;

    beforeEach(() => {
        pathIsDirectoryMock = jest.spyOn(
            pathIsDirectoryModule,
            'pathIsDirectory'
        );
        getFilesOfDirectoryRecursivelyMock = jest.spyOn(
            getFilesOfDirectoryRecursivelyModule,
            'getFilesOfDirectoryRecursively'
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array containing the absolutePath when it is not a directory', () => {
        const absolutePath = '/path/to/file.txt';
        pathIsDirectoryMock.mockReturnValue(false);

        const result = getNestedFiles(absolutePath);

        expect(result).toEqual([absolutePath]);
        expect(pathIsDirectoryMock).toHaveBeenCalledWith(absolutePath);
        expect(getFilesOfDirectoryRecursivelyMock).not.toHaveBeenCalled();
    });

    it('should return an array of nested file paths when absolutePath is a directory', () => {
        const absolutePath = '/path/to/directory';
        const nestedFiles = [
            '/path/to/directory/file1.txt',
            '/path/to/directory/file2.txt',
        ];

        pathIsDirectoryMock.mockReturnValue(true);
        getFilesOfDirectoryRecursivelyMock.mockReturnValue(nestedFiles);

        const result = getNestedFiles(absolutePath);

        expect(result).toEqual(nestedFiles);
        expect(pathIsDirectoryMock).toHaveBeenCalledWith(absolutePath);
        expect(getFilesOfDirectoryRecursivelyMock).toHaveBeenCalledWith(
            absolutePath
        );
    });
});
