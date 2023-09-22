import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { DependencyType } from '@nx/devkit';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';

export const getDependenciesOfFile = (
    mainProject: FilteredProject,
    file: string,
    files: string[],
    projects: FilteredProject[],
): ProjectGraphDependencyWithFile[] => {
    const { name } = mainProject;
    const projectSet: Set<string> = new Set();
    const dependencies: ProjectGraphDependencyWithFile[] = [];

    for (const file of files) {
        const project = getProjectFromFile(file, projects);
        if (name !== project && !projectSet.has(project)) {
            projectSet.add(project);
        }
    }

    for (const project of projectSet) {
        dependencies.push({
            source: name,
            target: project,
            sourceFile: file,
            dependencyType: DependencyType.static,
        });
    }

    return dependencies;
};
