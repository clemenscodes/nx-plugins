import { getProjectRoot } from './getProjectRoot';
import { CProjectType } from '../../../models/types';
import * as workspaceLayoutModule from '../getWorkspaceLayout/getWorkspaceLayout';

describe('getProjectRoot', () => {
    let workspaceLayoutMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceLayoutMock = jest
            .spyOn(workspaceLayoutModule, 'getWorkspaceLayout')
            .mockReturnValue({
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'as-provided',
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the provided project root for CProjectType.App', () => {
        const projectName = 'appProject';
        const projectType = CProjectType.App;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(projectName);
    });

    it('should return the derived project root for CProjectType.App', () => {
        workspaceLayoutMock.mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
            projectNameAndRootFormat: 'derived',
        });
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
        workspaceLayoutMock.mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
            projectNameAndRootFormat: 'derived',
        });
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
        workspaceLayoutMock.mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
            projectNameAndRootFormat: 'derived',
        });
        const projectName = 'testProject';
        const projectType = CProjectType.Test;
        const result = getProjectRoot(projectName, projectType);
        expect(result).toBe(`libs/testProject/test`);
    });
});
