import { readProjectFile } from './readProjectFile';
import * as fs from 'fs';

describe('readProjectFile', () => {
    let readFileSyncMock: jest.SpyInstance;

    beforeEach(() => {
        readFileSyncMock = jest.spyOn(fs, 'readFileSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should read and return file content', () => {
        const projectFile = 'some-directory/CMakeLists.txt';
        const fileContent = 'This is the file content';
        readFileSyncMock.mockReturnValue(fileContent);
        expect(readProjectFile(projectFile)).toBe(fileContent);
    });

    it('should throw an error for an invalid project file', () => {
        const projectFile = 'invalid_project_file.txt';

        expect(() => readProjectFile(projectFile)).toThrowError(
            'Invalid project file',
        );
    });
});
