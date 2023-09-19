import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';
import { getProjectTypeFromConfig } from './getProjectTypeFromConfig';

describe('getProjectTypeFromConfig', () => {
    let projectConfig: ProjectConfiguration;

    beforeEach(() => {
        projectConfig = {} as ProjectConfiguration;
    });

    it('should determine an application project', () => {
        projectConfig.projectType = 'application';
        const result = getProjectTypeFromConfig(projectConfig);
        expect(result).toBe(CProjectType.App);
    });

    it('should determine a library project', () => {
        projectConfig.projectType = 'library';
        const result = getProjectTypeFromConfig(projectConfig);
        expect(result).toBe(CProjectType.Lib);
    });

    it('should determine a test project when "test" tag is present', () => {
        projectConfig.tags = ['test'];
        const result = getProjectTypeFromConfig(projectConfig);
        expect(result).toBe(CProjectType.Test);
    });

    it('should determine an application project when no specific type or "test" tag is present', () => {
        projectConfig.tags = [];
        const result = getProjectTypeFromConfig(projectConfig);
        expect(result).toBe(CProjectType.App);
    });
});
