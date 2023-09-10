import {
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
    DependencyType,
    FileData,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';

export const shouldIgnoreExternalFile = (externalFile: string): boolean => {
    return externalFile.startsWith('include');
};

export const findDependencyFile = (
    project: string,
    externalFile: string,
    ctx: CreateDependenciesContext
): FileData | undefined => {
    const projectFiles = ctx.fileMap[project];
    if (!projectFiles) {
        return undefined;
    }
    const depFile = projectFiles.find((f) => f.file === externalFile);
    return depFile;
};

export const getProjectGraphDependencyWithFile = (
    source: string,
    target: string,
    sourceFile: string
): ProjectGraphDependencyWithFile => {
    const dependencyType = DependencyType.static;
    const dependency = { source, target, sourceFile, dependencyType };
    return dependency;
};

export const getDependenciesOfProject = (
    projectName: string,
    externalFiles: string[],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const externalFile of externalFiles) {
        if (shouldIgnoreExternalFile(externalFile)) {
            continue;
        }

        const project = getProjectFromFile(externalFile, projects);

        if (project === null) {
            continue;
        }

        const depFile = findDependencyFile(project, externalFile, ctx);

        if (!depFile) {
            continue;
        }

        ctx.fileMap[projectName].push(depFile);

        const dep = getProjectGraphDependencyWithFile(
            projectName,
            project,
            externalFile
        );

        deps.push(dep);
    }
    return deps;
};
