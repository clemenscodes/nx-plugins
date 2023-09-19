import type {
    CreateDependencies,
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { filterProjects } from '../utils/graphUtils/filterProjects/filterProjects';
import { getDependencies } from '../utils/graphUtils/getDependencies/getDependencies';
import { reduceDependenciesTransitively } from '../utils/graphUtils/reduceDependenciesTransitively/reduceDependenciesTransitively';

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    const { graph, nxJsonConfiguration, fileMap } = context;
    const { workspaceLayout } = nxJsonConfiguration;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const deps = getDependencies(workspaceLayout, filteredProjects, fileMap);
    const reducedDeps = reduceDependenciesTransitively(deps);
    return reducedDeps;
};
