import type { CreateDependenciesContext } from '@nx/devkit';
import type { FilteredProject } from '@/types';
import { createFilteredProject } from './createFilteredProject/createFilteredProject';
import { projectConfigContainsCTag } from './projectConfigContainsCTag/projectConfigContainsCTag';

export const filterProjects = (
    projects: CreateDependenciesContext['projects'],
): FilteredProject[] => {
    if (!projects) {
        throw new Error(`Failed to filter projects`);
    }
    const filteredProjects = Object.values(projects)
        .filter(projectConfigContainsCTag)
        .map(createFilteredProject);
    return filteredProjects;
};
