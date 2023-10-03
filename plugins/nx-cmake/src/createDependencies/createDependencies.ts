import type {
    CreateDependencies,
    CreateDependenciesContext,
    RawProjectGraphDependency,
} from '@nx/devkit';
import { filterProjects } from '../utils/graphUtils/filterProjects/filterProjects';
import { getDependencies } from '../utils/graphUtils/getDependencies/getDependencies';
import { reduceDependenciesTransitively } from '../utils/graphUtils/reduceDependenciesTransitively/reduceDependenciesTransitively';
import { filterFilesToProcess } from '../utils/graphUtils/filterFilesToProcess/filterFilesToProcess';

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext,
): RawProjectGraphDependency[] => {
    const { projects, nxJsonConfiguration, filesToProcess } = context;
    const { projectFileMap } = filesToProcess;
    const { workspaceLayout } = nxJsonConfiguration;
    if (Object.keys(filesToProcess).length === 0) {
        return [];
    }
    const filteredProjects = filterProjects(projects);
    const filteredFilesToProcess = filterFilesToProcess(
        projectFileMap,
        filteredProjects,
    );
    if (Object.keys(filteredFilesToProcess).length === 0) {
        return [];
    }
    const deps = getDependencies(
        workspaceLayout,
        filteredProjects,
        filteredFilesToProcess,
    );
    if (deps.length === 0) {
        return [];
    }
    const reducedDeps = reduceDependenciesTransitively(deps);
    return reducedDeps;
};
