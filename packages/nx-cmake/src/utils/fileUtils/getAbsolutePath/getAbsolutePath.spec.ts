import { getAbsolutePath } from './getAbsolutePath';
import { join } from 'path';

describe('getAbsolutePath', () => {
    it('should return the absolute path of a file', () => {
        const directory = '/path/to/directory';
        const file = 'file.txt';
        const expectedPath = join(directory, file);
        const result = getAbsolutePath(directory, file);
        expect(result).toBe(expectedPath);
    });
});
