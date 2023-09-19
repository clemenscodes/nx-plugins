import type {
    ProjectFileMap,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { CTag, FilteredProject } from '../../../models/types';
import { DependencyType } from '@nx/devkit';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';

export const hasValidExtension = (file: string, tag: CTag): boolean => {
    const isCFile = file.endsWith('.c');
    const isCppFile =
        file.endsWith('.cpp') || file.endsWith('.cxx') || file.endsWith('.cc');
    const isHFile = file.endsWith('.h');
    const isHppFile =
        isHFile ||
        file.endsWith('.hpp') ||
        file.endsWith('.hxx') ||
        file.endsWith('.hh');
    if (tag === 'c') {
        return isHFile || isCFile;
    } else if (tag === 'cpp') {
        return isHppFile || isCppFile;
    }
    return false;
};

export const isValidProjectFile = (file: string, tag: CTag) => {
    return (
        !file.startsWith('dist') &&
        !file.startsWith('include') &&
        hasValidExtension(file, tag)
    );
};

export const getProjectFiles = (
    projectName: string,
    tag: CTag,
    fileMap: ProjectFileMap
): string[] => {
    const files = fileMap[projectName];
    const projectFiles = files
        .map(({ file }) => file)
        .filter((file) => isValidProjectFile(file, tag));

    return projectFiles;
};

export const getDependenciesOfFile = (
    mainProject: FilteredProject,
    file: string,
    files: string[],
    projects: FilteredProject[]
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
