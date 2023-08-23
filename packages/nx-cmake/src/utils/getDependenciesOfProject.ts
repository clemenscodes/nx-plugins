import type { ProjectGraphProcessorContext } from '@nx/devkit';
import type { FilteredProject, Deps } from '../models/types';
import { getProjectFromFile } from './getProjectFromFile';

export const getDependenciesOfProject = (
    projectName: string,
    externalFiles: string[],
    ctx: ProjectGraphProcessorContext,
    projects: FilteredProject[]
): Deps[] => {
    const deps: Deps[] = [];
    for (const file of externalFiles) {
        const project = getProjectFromFile(file, projects);
        const depFile = ctx.fileMap[project].find((f) => f.file === file);
        if (!depFile) {
            continue;
        }
        ctx.fileMap[projectName].push(depFile);
        deps.push({
            sourceProject: projectName,
            dependsOnProject: project,
            file,
        });
    }
    return deps;
};
