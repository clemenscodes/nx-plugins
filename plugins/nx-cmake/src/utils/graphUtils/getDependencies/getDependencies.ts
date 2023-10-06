import type {
    NxJsonConfiguration,
    ProjectFileMap,
    RawProjectGraphDependency,
} from '@nx/devkit';
import type { FilteredProject } from '@/types';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = (
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    projects: FilteredProject[],
    filesToProcess: ProjectFileMap,
): RawProjectGraphDependency[] => {
    const deps: RawProjectGraphDependency[] = [];
    for (const project in filesToProcess) {
        const projectFiles = filesToProcess[project];
        const filteredProject = projects.find(({ name }) => name === project);
        const dependencies = filterDependenciesOfProject(
            filteredProject,
            workspaceLayout,
            projects,
            projectFiles,
        );
        deps.push(...dependencies);
    }
    return deps;
};
