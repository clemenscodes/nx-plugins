import {
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
    DependencyType,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectFromFile } from '../getProjectFromFile/getProjectFromFile';

export const getDependenciesOfProject = (
    projectName: string,
    externalFiles: string[],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const sourceFile of externalFiles) {
        const project = getProjectFromFile(sourceFile, projects);
        const depFile = ctx.fileMap[project].find((f) => f.file === sourceFile);
        if (!depFile) {
            continue;
        }
        ctx.fileMap[projectName].push(depFile);
        deps.push({
            source: projectName,
            target: project,
            sourceFile,
            dependencyType: DependencyType.static,
        });
    }
    return deps;
};
