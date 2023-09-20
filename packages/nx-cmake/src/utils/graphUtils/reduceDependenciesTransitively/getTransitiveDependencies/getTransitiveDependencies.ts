import type { Graph } from '../../../../models/types';

export const getTransitiveDependencies = (
    graph: Graph,
    node: string
): Set<string> => {
    console.log({ node, graph }, graph[node]);
    const dependencies = new Set<string>(graph[node]);
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
