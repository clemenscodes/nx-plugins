import type { Graph } from '@/config';

export const reduceGraph = (graph: Graph): Graph => {
    const result: Graph = {};
    for (const node in graph) {
        result[node] = new Set<string>(graph[node]);
        const dependencies = graph[node];
        for (const dependency of dependencies) {
            const neighbors = graph[dependency];
            for (const neighbor of neighbors) {
                if (graph[node].has(neighbor)) {
                    result[node].delete(neighbor);
                }
            }
        }
    }
    return result;
};
