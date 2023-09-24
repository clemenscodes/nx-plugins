import type { FilteredProject } from '../../../models/types';

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[],
): string | null => {
    if (projects.length === 0) {
        return null;
    }

    const project = projects.find(({ root, sourceRoot }) => {
        const isInSourceRoot = file.startsWith(`${sourceRoot}/`);
        const isInProjectRoot = file.startsWith(`${root}/`);
        if (isInSourceRoot) {
            return true;
        }
        if (isInProjectRoot) {
            return true;
        }
        return false;
    });

    if (!project) {
        return null;
    }

    const { name } = project;

    return name;
};
