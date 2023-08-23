import type { FilteredProject } from '../models/types';

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[]
) => {
    const project = projects
        .filter(({ root }) => file.includes(root))
        .map(({ name }) => name)
        .pop();
    return project;
};
