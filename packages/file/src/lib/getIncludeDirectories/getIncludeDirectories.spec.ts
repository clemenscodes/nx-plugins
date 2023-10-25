import { getIncludeDirectories } from './getIncludeDirectories';
import { join } from 'path';
import * as fs from 'fs';

describe('getIncludeDirectories', () => {
    let readdirSyncMock: jest.SpyInstance;
    let statSyncMock: jest.SpyInstance;

    beforeEach(() => {
        readdirSyncMock = jest.spyOn(fs, 'readdirSync');
        statSyncMock = jest.spyOn(fs, 'statSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an empty array if no include directories are found', () => {
        readdirSyncMock.mockReturnValueOnce(['folder1', 'folder2']);
        readdirSyncMock.mockReturnValue([]);
        statSyncMock.mockReturnValue({ isFile: () => false });
        const result = getIncludeDirectories(join('/some/path'));
        expect(result).toEqual([]);
    });

    it('should return an array of found include directories', () => {
        readdirSyncMock.mockReturnValueOnce(['include', 'src', 'tests']);
        readdirSyncMock.mockReturnValue([]);
        statSyncMock.mockReturnValue({ isFile: () => false });
        const result = getIncludeDirectories(join('/some/path'));
        expect(result).toEqual([join('/some/path/include')]);
    });

    it('should return nested include directories', () => {
        readdirSyncMock.mockImplementationOnce(() => [
            'include',
            'src',
            'tests',
            'subdir',
        ]);
        readdirSyncMock.mockImplementation((path) => {
            if (path === join('/some/path/subdir')) {
                return ['include'];
            }
            return [];
        });
        statSyncMock.mockReturnValue({ isFile: () => false });
        const result = getIncludeDirectories(join('/some/path'));
        expect(result).toEqual([
            join('/some/path/include'),
            join('/some/path/subdir/include'),
        ]);
    });
});
