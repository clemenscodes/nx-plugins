import {
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
    DependencyType,
    FileData,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectFromFile } from '../../getProjectFromFile/getProjectFromFile';

export const shouldIgnoreExternalFile = (externalFile: string): boolean => {
    return externalFile.startsWith('include');
};

const findDependencyFile = (
    project: string,
    externalFile: string,
    ctx: CreateDependenciesContext
): FileData | undefined => {
    const depFile = ctx.fileMap[project].find((f) => f.file === externalFile);
    return depFile;
};

export const getProjectGraphDependencyWithFile = (
    projectName: string,
    project: string,
    externalFile: string
): ProjectGraphDependencyWithFile => {
    const dependency = {
        source: projectName,
        target: project,
        sourceFile: externalFile,
        dependencyType: DependencyType.static,
    };
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
        const depFile = findDependencyFile(project, externalFile, ctx);

        if (depFile) {
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
