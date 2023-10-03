import type { ProjectFileMap } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';

export const filterFilesToProcess = (
    filesToProcess: ProjectFileMap,
    filteredProjects: FilteredProject[],
): ProjectFileMap => {
    const filteredFilesToProcess: ProjectFileMap = {};
    for (const { name } of filteredProjects) {
        if (filesToProcess[name]) {
            filteredFilesToProcess[name] = filesToProcess[name];
        }
    }
    return filteredFilesToProcess;
};
