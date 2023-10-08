import { getFileName } from './getFileName';

describe('getFileName', () => {
    it('should generate the correct file name', () => {
        const projectRoot = 'projectA';
        const name = 'testfile';
        const tag = 'c';
        const result = getFileName(projectRoot, name, tag);
        expect(result).toBe('projectA/src/testfile.c');
    });
});
