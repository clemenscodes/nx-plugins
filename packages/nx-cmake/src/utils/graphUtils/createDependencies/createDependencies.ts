import type {
    CreateDependencies,
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { filterProjects } from '../filterProjects/filterProjects';
import { getDependencies } from '../getDependencies/getDependencies';

export const createDependencies: CreateDependencies = async (
    context: CreateDependenciesContext
): Promise<ProjectGraphDependencyWithFile[]> => {
    const { graph, nxJsonConfiguration } = context;
    const { workspaceLayout } = nxJsonConfiguration;
    const { libsDir } = workspaceLayout;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const deps = await getDependencies(libsDir, context, filteredProjects);
    return deps;
};
