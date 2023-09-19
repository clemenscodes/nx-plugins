import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { logger } from '@nx/devkit';
import { buildAdjacencyList } from '../buildAdjacencyList/buildAdjacencyList';

export const hasCyclicDependencies = (
    dependencies: ProjectGraphDependencyWithFile[]
): boolean => {
    const adjacencyList = buildAdjacencyList(dependencies);
    const visited: Record<string, boolean> = {};
    const recStack: Record<string, boolean> = {};
    const isCyclic = (node: string): boolean => {
        if (!visited[node]) {
            visited[node] = true;
            recStack[node] = true;
            const neighbors = adjacencyList[node] || [];
            for (const neighbor of neighbors) {
                if (!visited[neighbor] && isCyclic(neighbor)) {
                    if (!node.startsWith('test')) {
                        logger.error(
                            `nx-cmake detected circular dependency: ${node}`
                        );
                    }
                    return true;
                } else if (recStack[neighbor]) {
                    if (!node.startsWith('test')) {
                        logger.error(
                            `nx-cmake detected circular dependency: ${node}`
                        );
                    }
                    return true;
                }
            }
        }
        recStack[node] = false;
        return false;
    };
    const nodes = Object.keys(adjacencyList);
    for (const node of nodes) {
        if (isCyclic(node)) {
            return true;
        }
    }
    return false;
};
