import type { RawProjectGraphDependency } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { DependencyType } from '@nx/devkit';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';

export const getDependenciesOfFile = (
    mainProject: FilteredProject,
    file: string,
    files: string[],
    projects: FilteredProject[],
): RawProjectGraphDependency[] => {
    const { name } = mainProject;
    const projectSet: Set<string> = new Set();
    const dependencies: RawProjectGraphDependency[] = [];

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
            type: DependencyType.static,
        });
    }

    return dependencies;
};
