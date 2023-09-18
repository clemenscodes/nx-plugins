import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { CTag, FilteredProject } from '../../../models/types';
import { DependencyType } from '@nx/devkit';
import { CProjectType } from '../../../models/types';
import { getFilesOfDirectoryRecursively } from '../../fileUtils/getFilesOfDirectoryRecursively/getFilesOfDirectoryRecursively';
import { getProjectFromFile } from '../../generatorUtils/getProjectFromFile/getProjectFromFile';
import { getAbsolutePath } from '../../fileUtils/getAbsolutePath/getAbsolutePath';

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
    projectRoot: string,
    tag: CTag,
    projectType: CProjectType
): string[] => {
    const projectFiles = getFilesOfDirectoryRecursively(projectRoot)
        .filter((file) => isValidProjectFile(file, tag))
        .filter((file) => {
            const testRoot = getAbsolutePath(projectRoot, 'test');
            const isTestFile = file.startsWith(testRoot);
            return !(projectType !== CProjectType.Test && isTestFile);
        });
    return projectFiles;
};

export const getDependenciesOfProject = (
    mainProject: FilteredProject,
    files: string[],
    tag: CTag,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const { root: mainRoot, type, name } = mainProject;
    const projectSet: Set<string> = new Set();
    const dependencies: ProjectGraphDependencyWithFile[] = [];
    const mainProjectFiles = getProjectFiles(mainRoot, tag, type);
    const projectFiles = files.filter((file) => isValidProjectFile(file, tag));

    for (const file of projectFiles) {
        const project = getProjectFromFile(file, projects);

        if (name !== project && !projectSet.has(project)) {
            projectSet.add(project);
        }
    }

    for (const project of projectSet) {
        for (const mainFile of mainProjectFiles) {
            dependencies.push({
                source: name,
                target: project,
                sourceFile: mainFile,
                dependencyType: DependencyType.static,
            });
        }
    }

    return dependencies;
};
