import type { FilteredProject } from '../../../models/types';

export const getProjectRootOfFile = (file: string) => {
    if (file.includes('/include/')) {
        const [projectRoot] = file.split('/include');
        return projectRoot;
    }
    if (file.includes('/src/')) {
        const [projectRoot] = file.split('/src');
        return projectRoot;
    }
};

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[]
) => {
    const fileProjectRoot = getProjectRootOfFile(file);
    const project = projects
        .filter((project) => {
            const { root } = project;
            const includesRoot = fileProjectRoot === root;
            return includesRoot;
        })
        .map((project) => {
            const { name } = project;
            return name;
        })
        .pop();
    return project;
};
