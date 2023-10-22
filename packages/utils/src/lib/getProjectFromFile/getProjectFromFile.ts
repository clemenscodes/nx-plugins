import type { FilteredProject } from '@/types';
import { normalizePath } from '@nx/devkit';

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[],
): string | null => {
    if (projects.length === 0) {
        return null;
    }

    const unixPath = normalizePath(file);

    const project = projects.find(({ root, sourceRoot }) => {
        const isInSourceRoot = unixPath.startsWith(`${sourceRoot}/`);
        const isInProjectRoot = unixPath.startsWith(`${root}/`);
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
