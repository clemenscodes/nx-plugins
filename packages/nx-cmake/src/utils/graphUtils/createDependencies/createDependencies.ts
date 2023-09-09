import type {
    CreateDependencies,
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { filterProjects } from '../filterProjects/filterProjects';
import { getDependencies } from '../getDependencies/getDependencies';

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    const { graph, nxJsonConfiguration } = context;
    const { workspaceLayout } = nxJsonConfiguration;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const deps = getDependencies(workspaceLayout, context, filteredProjects);
    return deps;
};
