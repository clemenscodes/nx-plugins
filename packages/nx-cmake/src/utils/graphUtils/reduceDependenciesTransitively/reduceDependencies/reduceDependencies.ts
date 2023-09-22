import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { Graph } from '../../../../models/types';

export const reduceDependencies = (
    graph: Graph,
    deps: ProjectGraphDependencyWithFile[],
): ProjectGraphDependencyWithFile[] => {
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
