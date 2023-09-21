import type {
    ProjectFileMap,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { readCachedProjectGraph, DependencyType } from '@nx/devkit';
import { getAnySourceFile } from '../getAnySourceFile/getAnySourceFile';

export const getCachedDependencies = (
    fileMap: ProjectFileMap
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    try {
        const { dependencies } = readCachedProjectGraph();
        for (const project in dependencies) {
            if (project.startsWith('npm:')) {
                continue;
            }
            for (const { source, target } of dependencies[project]) {
                deps.push({
                    source,
                    target,
                    sourceFile: getAnySourceFile(project, fileMap),
                    dependencyType: DependencyType.static,
                });
            }
        }
        return deps;
    } catch {
        return deps;
    }
};
