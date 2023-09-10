import { getProjectType } from './getProjectType';
import { CProjectType } from '../../../models/types';

jest.mock('../getWorkspaceLayout/getWorkspaceLayout', () => ({
    getWorkspaceLayout: () => ({
        appsDir: 'apps',
        libsDir: 'libs',
        projectNameAndRootFormat: 'as-provided',
    }),
}));

describe('getProjectType', () => {
    it('should return CProjectType.App for app directory', () => {
        const result = getProjectType('apps/my-app/some-file');
        expect(result).toBe(CProjectType.App);
    });

    it('should return CProjectType.Lib for lib directory', () => {
        const result = getProjectType('libs/my-lib/some-file');
        expect(result).toBe(CProjectType.Lib);
    });

    it('should return CProjectType.App for test directory', () => {
        const result = getProjectType('apps/my-app/test/some-file');
        expect(result).toBe(CProjectType.App);
    });

    it('should throw an error for an invalid directory', () => {
        expect(() => {
            getProjectType('invalid-directory/some-file');
        }).toThrow('Failed to determine project type');
    });
});
