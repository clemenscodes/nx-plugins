import { getAbsolutePath } from './getAbsolutePath';

describe('getAbsolutePath', () => {
    it('should return the absolute path of a file', () => {
        const directory = '/path/to/directory';
        const file = 'file.txt';

        const result = getAbsolutePath(directory, file);

        expect(result).toBe('/path/to/directory/file.txt');
    });

    it('should return the absolute path of a file', () => {
        const directory = 'path/to/directory';
        const file = 'file.txt';

        const result = getAbsolutePath(directory, file);

        expect(result).toBe('path/to/directory/file.txt');
    });
});
