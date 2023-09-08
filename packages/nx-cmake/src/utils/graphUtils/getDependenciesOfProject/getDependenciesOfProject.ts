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
    for (const externalFile of externalFiles) {
        if (externalFile.startsWith('include')) {
            continue;
        }
        const project = getProjectFromFile(externalFile, projects);
        const depFile = ctx.fileMap[project].find(
            (f) => f.file === externalFile
        );
        if (!depFile) {
            continue;
        }
        ctx.fileMap[projectName].push(depFile);
        deps.push({
            source: projectName,
            target: project,
            sourceFile: externalFile,
            dependencyType: DependencyType.static,
        });
    }
    return deps;
};
