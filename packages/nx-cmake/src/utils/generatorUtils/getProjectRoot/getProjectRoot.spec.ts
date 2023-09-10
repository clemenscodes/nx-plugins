import { getProjectRoot } from './getProjectRoot';
import * as workspaceLayoutModule from '../getWorkspaceLayout/getWorkspaceLayout';
import { CProjectType } from '../../../models/types';

describe('getProjectRoot', () => {
    beforeEach(() => {
        jest.spyOn(workspaceLayoutModule, 'getWorkspaceLayout').mockReturnValue(
            {
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'as-provided',
            }
        );
    });

    it('should return the provided project root for CProjectType.App', () => {
        const projectName = 'appProject';
        const projectType = CProjectType.App;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(projectName);
    });

    it('should return the derived project root for CProjectType.App', () => {
        jest.spyOn(workspaceLayoutModule, 'getWorkspaceLayout').mockReturnValue(
            {
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'derived',
            }
        );

        const projectName = 'appProject';
        const projectType = CProjectType.App;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`apps/appProject`);
    });

    it('should return the provided project root for CProjectType.Lib', () => {
        const projectName = 'libProject';
        const projectType = CProjectType.Lib;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/libProject`);
    });

    it('should return the provided project root for CProjectType.Lib', () => {
        jest.spyOn(workspaceLayoutModule, 'getWorkspaceLayout').mockReturnValue(
            {
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'derived',
            }
        );

        const projectName = 'libProject';
        const projectType = CProjectType.Lib;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/libProject`);
    });

    it('should return the derived project root for CProjectType.Test (with as-provided set)', () => {
        const projectName = 'testProject';
        const projectType = CProjectType.Test;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/testProject/test`);
    });

    it('should return the derived project root for CProjectType.Test', () => {
        jest.spyOn(workspaceLayoutModule, 'getWorkspaceLayout').mockReturnValue(
            {
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'derived',
            }
        );

        const projectName = 'testProject';
        const projectType = CProjectType.Test;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/testProject/test`);
    });
});
