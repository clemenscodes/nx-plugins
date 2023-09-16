import { ProjectGraphDependencyWithFile, DependencyType } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';

export const shouldIgnoreExternalFile = (externalFile: string): boolean => {
    return externalFile.startsWith('include');
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
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    const projectFiles = [];
    for (const externalFile of externalFiles) {
        if (shouldIgnoreExternalFile(externalFile)) {
            continue;
        }

        const project = getProjectFromFile(externalFile, projects);

        if (project === projectName) {
            projectFiles.push(externalFile);
            continue;
        }

        if (project === null) {
            continue;
        }
    }

    for (const externalFile of externalFiles) {
        const project = getProjectFromFile(externalFile, projects);

        if (project === projectName) {
            continue;
        }
        for (const projectFile of projectFiles) {
            const dep = getProjectGraphDependencyWithFile(
                projectName,
                project,
                projectFile
            );
            deps.push(dep);
        }
    }
    return deps;
};
