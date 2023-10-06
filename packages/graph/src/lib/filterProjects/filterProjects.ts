import type { CreateDependenciesContext } from '@nx/devkit';
import type { FilteredProject } from '@/types';
import { getProjectTypeFromConfig } from '@/utils';
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
            if (!name) {
                throw new Error(
                    `Could not get name from project configuration`,
                );
            }
            if (!sourceRoot) {
                throw new Error(
                    `Could not get sourceRoot from project configuration`,
                );
            }
            const tag = getTag(tags);
            const type = getProjectTypeFromConfig(config);
            return { name, root, type, tag, sourceRoot };
        });
    if (!filteredProjects) {
        throw new Error(`Failed to filter projects`);
    }
    return filteredProjects;
};
