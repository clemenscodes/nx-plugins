import * as fs from 'fs';
import { readAllFilesOfDirectory } from './readAllFilesOfDirectory';

describe('readAllFilesOfDirectory', () => {
    let readDirSyncMock: jest.SpyInstance;

    beforeEach(() => {
        readDirSyncMock = jest.spyOn(fs, 'readdirSync');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array of file names', () => {
        const directory = '/path/to/directory';
        readDirSyncMock.mockReturnValue(['file1.txt', 'file2.txt']);

        const result = readAllFilesOfDirectory(directory);

        expect(result).toEqual(['file1.txt', 'file2.txt']);
        expect(readDirSyncMock).toHaveBeenCalledWith(directory);
    });
});
