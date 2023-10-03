import type { CreateDependenciesContext } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectTypeFromConfig } from '../../generatorUtils/getProjectTypeFromConfig/getProjectTypeFromConfig';
import { getTag } from './getTag/getTag';
import { isC } from './isC/isC';

export const filterProjects = (
    projects: CreateDependenciesContext['projects'],
): FilteredProject[] => {
    const filteredProjects = Object.values(projects)
        .filter(({ tags }) => {
            if (tags) {
                return tags.some(isC);
            }
            return false;
        })
        .map((config) => {
            const { name, root, tags, sourceRoot } = config;
            const tag = getTag(tags);
            const type = getProjectTypeFromConfig(config);
            return { name, root, type, tag, sourceRoot };
        });
    return filteredProjects;
};
