import type { ProjectGraphDependencyWithFile } from '@nx/devkit';

export const buildAdjacencyList = (
    dependencies: ProjectGraphDependencyWithFile[]
): Record<string, string[]> => {
    const adjacencyList: Record<string, string[]> = {};
    for (const dependency of dependencies) {
        const { source, target } = dependency;
        if (!adjacencyList[source]) {
            adjacencyList[source] = [];
        }
        adjacencyList[source].push(target);
    }
    return adjacencyList;
};
