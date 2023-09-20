import type { Graph } from '../../../../models/types';
import { getTransitiveDependencies } from '../getTransitiveDependencies/getTransitiveDependencies';

export const reduceGraph = (graph: Graph): Graph => {
    console.log({ graph });
    const result: Graph = {};
    for (const node in graph) {
        const dependencies = getTransitiveDependencies(graph, node);
        console.log({ graph, node, dependencies });
        result[node] = dependencies;
    }
    return result;
};
