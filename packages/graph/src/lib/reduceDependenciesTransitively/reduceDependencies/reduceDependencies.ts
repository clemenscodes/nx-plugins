import type { RawProjectGraphDependency } from '@nx/devkit';
import type { Graph } from '@/config';

export const reduceDependencies = (
    graph: Graph,
    deps: RawProjectGraphDependency[],
): RawProjectGraphDependency[] => {
    const reducedDeps = [];
    for (const dep of deps) {
        const { source, target } = dep;
        if (source === target) {
            continue;
        }
        const graphDeps = graph[source];

        if (graphDeps.has(target)) {
            reducedDeps.push(dep);
        }
    }
    return reducedDeps;
};
