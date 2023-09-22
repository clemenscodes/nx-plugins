import { getFilesFromDirectoryFiles } from './getFilesFromDirectoryFiles';
import * as getNestedFilesModule from '../getNestedFiles/getNestedFiles';
import * as getAbsolutePathModule from '../getAbsolutePath/getAbsolutePath';

describe('getFilesFromDirectoryFiles', () => {
    let getAbsolutePathMock: jest.SpyInstance;
    let getNestedFilesMock: jest.SpyInstance;

    beforeEach(() => {
        getAbsolutePathMock = jest.spyOn(
            getAbsolutePathModule,
            'getAbsolutePath',
        );
        getNestedFilesMock = jest.spyOn(getNestedFilesModule, 'getNestedFiles');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array when given an empty directoryFiles array', () => {
        const directory = '/path/to/directory';
        const directoryFiles: string[] = [];

        const result = getFilesFromDirectoryFiles(directory, directoryFiles);

        expect(result).toEqual([]);
        expect(getAbsolutePathMock).not.toHaveBeenCalled();
        expect(getNestedFilesMock).not.toHaveBeenCalled();
    });

    it('should return an array of absolute file paths', () => {
        const directory = 'path/to/directory';
        const directoryFiles = ['file1.txt', 'file2.txt'];

        getAbsolutePathMock.mockImplementation(
            (dir, file) => `/absolute/path/${dir}/${file}`,
        );
        getNestedFilesMock.mockImplementation((absolutePath) => [
            `${absolutePath}/nested/file1.txt`,
            `${absolutePath}/nested/file2.txt`,
        ]);

        const result = getFilesFromDirectoryFiles(directory, directoryFiles);

        expect(result).toEqual([
            '/absolute/path/path/to/directory/file1.txt/nested/file1.txt',
            '/absolute/path/path/to/directory/file1.txt/nested/file2.txt',
            '/absolute/path/path/to/directory/file2.txt/nested/file1.txt',
            '/absolute/path/path/to/directory/file2.txt/nested/file2.txt',
        ]);
        expect(getAbsolutePathMock).toHaveBeenCalledTimes(2);
        expect(getNestedFilesMock).toHaveBeenCalledTimes(2);
    });
});
