import { getWorkspaceIncludeDir } from './getWorkspaceIncludeDir';

describe('getWorkspaceIncludeDir', () => {
    it('should return the workspace include directory', () => {
        const result = getWorkspaceIncludeDir();
        expect(result).toBe('include');
    });
});
