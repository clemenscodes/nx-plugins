import { Tree, readProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';

export const getProjectTypeWithTree = (
    tree: Tree,
    projectName: string
): CProjectType => {
    const { projectType, tags } = readProjectConfiguration(tree, projectName);
    if (projectType === 'library') {
        return CProjectType.Lib;
    }
    if (tags.includes('test')) {
        return CProjectType.Test;
    }
    return CProjectType.App;
};
