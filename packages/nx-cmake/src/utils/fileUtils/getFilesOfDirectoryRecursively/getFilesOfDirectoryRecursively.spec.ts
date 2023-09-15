import { getFilesOfDirectoryRecursively } from './getFilesOfDirectoryRecursively';
import * as readAllFilesOfDirectoryModule from '../readAllFilesOfDirectory/readAllFilesOfDirectory';
import * as getFilesFromDirectoryFilesModule from '../getFilesFromDirectoryFiles/getFilesFromDirectoryFiles';

describe('getFilesOfDirectoryRecursively', () => {
    let readAllFilesOfDirectoryMock: jest.SpyInstance;
    let getFilesFromDirectoryFilesMock: jest.SpyInstance;

    beforeEach(() => {
        readAllFilesOfDirectoryMock = jest.spyOn(
            readAllFilesOfDirectoryModule,
            'readAllFilesOfDirectory'
        );
        getFilesFromDirectoryFilesMock = jest.spyOn(
            getFilesFromDirectoryFilesModule,
            'getFilesFromDirectoryFiles'
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array when given an empty directory', () => {
        readAllFilesOfDirectoryMock.mockReturnValue([]);
        getFilesFromDirectoryFilesMock.mockReturnValue([]);

        const result = getFilesOfDirectoryRecursively('');

        expect(result).toEqual([]);
        expect(readAllFilesOfDirectoryMock).toHaveBeenCalledWith('');
        expect(getFilesFromDirectoryFilesMock).toHaveBeenCalledWith('', []);
    });

    it('should return an array of files', () => {
        const directory = '/path/to/directory';
        const directoryFiles = ['file1.txt', 'file2.txt'];
        const files = [
            '/path/to/directory/file1.txt',
            '/path/to/directory/file2.txt',
        ];

        readAllFilesOfDirectoryMock.mockReturnValue(directoryFiles);
        getFilesFromDirectoryFilesMock.mockReturnValue(files);

        const result = getFilesOfDirectoryRecursively(directory);

        expect(result).toEqual(files);
        expect(readAllFilesOfDirectoryMock).toHaveBeenCalledWith(directory);
        expect(getFilesFromDirectoryFilesMock).toHaveBeenCalledWith(
            directory,
            directoryFiles
        );
    });
});
