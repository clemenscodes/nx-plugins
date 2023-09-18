import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';

describe('getProjectTypeFromConfig', () => {
    let projectConfig: ProjectConfiguration;

    beforeEach(() => {
        projectConfig = {} as ProjectConfiguration;
    });

    it.todo('should determine an application project');
    it.todo('should determine a library project');
    it.todo('should determine a test project');
});
