import type {
    CreateDependencies,
    CreateDependenciesContext,
    ProjectFileMap,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { filterProjects } from '../utils/graphUtils/filterProjects/filterProjects';
import { getDependencies } from '../utils/graphUtils/getDependencies/getDependencies';
import { reduceDependenciesTransitively } from '../utils/graphUtils/reduceDependenciesTransitively/reduceDependenciesTransitively';
import { FilteredProject } from '../models/types';

export const filterFilesToProcess = (
    filesToProcess: ProjectFileMap,
    filteredProjects: FilteredProject[]
): ProjectFileMap => {
    const filteredFilesToProcess: ProjectFileMap = {};
    for (const { name } of filteredProjects) {
        if (filesToProcess[name]) {
            filteredFilesToProcess[name] = filesToProcess[name];
        }
    }
    return filteredFilesToProcess;
};

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    const { graph, nxJsonConfiguration, filesToProcess } = context;
    if (Object.keys(filesToProcess).length === 0) {
        return [];
    }
    const { workspaceLayout } = nxJsonConfiguration;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const filteredFilesToProcess = filterFilesToProcess(
        filesToProcess,
        filteredProjects
    );
    if (Object.keys(filteredFilesToProcess).length === 0) {
        return [];
    }
    const deps = getDependencies(
        workspaceLayout,
        filteredProjects,
        filteredFilesToProcess
    );
    if (deps.length === 0) {
        return deps;
    }
    const reducedDeps = reduceDependenciesTransitively(deps);
    return reducedDeps;
};
