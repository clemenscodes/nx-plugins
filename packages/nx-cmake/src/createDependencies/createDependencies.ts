import {
    type CreateDependencies,
    type CreateDependenciesContext,
    type ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { filterProjects } from '../utils/graphUtils/filterProjects/filterProjects';
import { getDependencies } from '../utils/graphUtils/getDependencies/getDependencies';
import { reduceDependenciesTransitively } from '../utils/graphUtils/reduceDependenciesTransitively/reduceDependenciesTransitively';
import { filterFilesToProcess } from '../utils/graphUtils/filterFilesToProcess/filterFilesToProcess';
import { getCachedDependencies } from '../utils/graphUtils/getCachedDependencies/getCachedDependencies';

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    const { graph, nxJsonConfiguration, fileMap, filesToProcess } = context;
    const dependencies = getCachedDependencies(fileMap);
    if (Object.keys(filesToProcess).length === 0) {
        return dependencies;
    }
    const { workspaceLayout } = nxJsonConfiguration;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const filteredFilesToProcess = filterFilesToProcess(
        filesToProcess,
        filteredProjects
    );
    if (Object.keys(filteredFilesToProcess).length === 0) {
        return dependencies;
    }
    const deps = getDependencies(
        workspaceLayout,
        filteredProjects,
        filteredFilesToProcess
    );
    dependencies.push(...deps);
    const reducedDeps = reduceDependenciesTransitively(dependencies);
    return reducedDeps;
};
