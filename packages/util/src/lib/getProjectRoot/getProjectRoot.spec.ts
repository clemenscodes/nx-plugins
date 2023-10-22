import { getProjectRoot } from './getProjectRoot';
import { CProjectType } from '@/types';
import * as getWorkspaceLayoutModule from '../getWorkspaceLayout/getWorkspaceLayout';

describe('getProjectRoot', () => {
    beforeEach(() => {
        jest.spyOn(
            getWorkspaceLayoutModule,
            'getWorkspaceLayout',
        ).mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the project root for CProjectType.App', () => {
        const projectName = 'appProject';
        const projectType = CProjectType.App;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`apps/${projectName}`);
    });

    it('should return the project root for CProjectType.Lib', () => {
        const projectName = 'libProject';
        const projectType = CProjectType.Lib;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/libProject`);
    });

    it('should return the project root for CProjectType.Test', () => {
        const projectName = 'testProject';
        const projectType = CProjectType.Test;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`apps/testProject`);
    });
});
