import * as fs from 'fs';
import { pathIsDirectory } from './pathIsDirectory';

describe('pathIsDirectory', () => {
    let statSyncMock: jest.SpyInstance;

    beforeEach(() => {
        statSyncMock = jest.spyOn(fs, 'statSync');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true for a directory path', () => {
        const path = '/path/to/directory';
        statSyncMock.mockReturnValue({ isDirectory: () => true });

        const result = pathIsDirectory(path);

        expect(result).toBe(true);
        expect(statSyncMock).toHaveBeenCalledWith(path);
    });

    it('should return false for a file path', () => {
        const path = '/path/to/file.txt';
        statSyncMock.mockReturnValue({ isDirectory: () => false });

        const result = pathIsDirectory(path);

        expect(result).toBe(false);
        expect(statSyncMock).toHaveBeenCalledWith(path);
    });
});
