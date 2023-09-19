import type { Graph } from '../../../../models/types';
import { getTransitiveDependencies } from '../getTransitiveDependencies/getTransitiveDependencies';

export const reduceGraph = (graph: Graph): Graph => {
    const result: Graph = {};
    for (const node in graph) {
        const dependencies = getTransitiveDependencies(graph, node);
        result[node] = dependencies;
    }
    return result;
};
