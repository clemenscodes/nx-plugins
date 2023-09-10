import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../models/types';

export const getProjectConfigurationType = (
    type: CProjectType
): ProjectConfiguration['projectType'] => {
    return type === CProjectType.Lib ? 'library' : 'application';
};
