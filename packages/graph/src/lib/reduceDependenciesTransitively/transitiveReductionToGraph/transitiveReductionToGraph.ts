import type { Graph } from '@/config';
import type { RawProjectGraphDependency } from '@nx/devkit';
import { buildGraphFromDeps } from '../buildGraphFromDeps/buildGraphFromDeps';
import { reduceGraph } from '../reduceGraph/reduceGraph';

export const transitiveReductionToGraph = (
    dependencies: RawProjectGraphDependency[],
): Graph => {
    const graph = buildGraphFromDeps(dependencies);
    const reducedGraph = reduceGraph(graph);
    return reducedGraph;
};
