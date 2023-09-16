import { shouldIgnoreExternalFile } from './getDependenciesOfProject';

describe('shouldIgnoreExternalFile', () => {
    it('should return true for external files starting with "include"', () => {
        expect(shouldIgnoreExternalFile('include/file.js')).toBe(true);
    });

    it('should return false for external files not starting with "include"', () => {
        expect(shouldIgnoreExternalFile('notinclude/file.js')).toBe(false);
    });
});
