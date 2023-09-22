import type { Graph } from '../../../../models/types';
import type { ProjectGraphDependencyWithFile } from '@nx/devkit';

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
