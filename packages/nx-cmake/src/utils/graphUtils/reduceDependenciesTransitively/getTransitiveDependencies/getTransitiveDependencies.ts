import type { Graph } from '../../../../models/types';

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
