import type { Graph } from '../../../models/types';
import {
    type ProjectGraphDependencyWithFile,
    output,
    logger,
} from '@nx/devkit';

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
                        output.addNewline();
                        logger.error(
                            `nx-cmake: detected circular dependecy ${node}`
                        );
                    }
                    return true;
                } else if (recStack[neighbor]) {
                    if (!node.startsWith('test')) {
                        output.addNewline();
                        logger.error(
                            `nx-cmake: detected circular dependecy ${node}`
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

export const buildGraphFromDeps = (
    deps: ProjectGraphDependencyWithFile[]
): Graph => {
    const graph: Graph = {};
    for (const dependency of deps) {
        const { source, target } = dependency;

        if (!graph[source]) {
            graph[source] = new Set();
        }

        if (!graph[target]) {
            graph[target] = new Set();
        }

        graph[source].add(target);
    }
    return graph;
};

export const getTransitiveDependencies = (
    graph: Graph,
    node: string
): Set<string> => {
    const dependencies = graph[node] || new Set<string>();
    const transitiveDependencies = new Set<string>();

    for (const dependency of dependencies) {
        transitiveDependencies.add(dependency);

        const subDependencies = getTransitiveDependencies(graph, dependency);

        for (const subDep of subDependencies) {
            if (dependencies.has(subDep)) {
                dependencies.delete(subDep);
                continue;
            }
            transitiveDependencies.add(subDep);
        }
    }

    return transitiveDependencies;
};

export const reduceGraph = (graph: Graph): Graph => {
    const result: Graph = {};

    for (const node in graph) {
        const dependencies = getTransitiveDependencies(graph, node);
        result[node] = dependencies;
    }

    return result;
};

export const transitiveReductionToGraph = (
    dependencies: ProjectGraphDependencyWithFile[]
): Graph => {
    const graph = buildGraphFromDeps(dependencies);
    const reducedGraph = reduceGraph(graph);
    return reducedGraph;
};

export const reduceDependencies = (
    graph: Graph,
    deps: ProjectGraphDependencyWithFile[]
): ProjectGraphDependencyWithFile[] => {
    const reducedDeps = [];

    for (const dep of deps) {
        const { source, target } = dep;
        const graphDeps = graph[source];

        if (graphDeps.has(target)) {
            reducedDeps.push(dep);
        }
    }

    return reducedDeps;
};

export const reduceDependenciesTransitively = (
    deps: ProjectGraphDependencyWithFile[]
): ProjectGraphDependencyWithFile[] => {
    if (hasCyclicDependencies(deps)) {
        output.error({
            title: `Failed to optimize project graph`,
        });
        return deps;
    }
    const graph = transitiveReductionToGraph(deps);
    const reducedDependencies = reduceDependencies(graph, deps);
    return reducedDependencies;
};
