import { FilteredProject } from '../../models/types';

export const getProjectRootOfFile = (file: string): string | null => {
    let projectRoot: string | null = null;

    if (file.includes('/include/')) {
        projectRoot = file.split('/include')[0];
    } else if (file.includes('/src/')) {
        projectRoot = file.split('/src')[0];
    }

    return projectRoot || null;
};

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[]
): string | null => {
    if (projects.length === 0) {
        return null;
    }
    const fileProjectRoot = getProjectRootOfFile(file);
    if (fileProjectRoot === null) {
        return null;
    }

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
