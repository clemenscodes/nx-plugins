import type { Graph } from '../../../../models/types';
import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { buildGraphFromDeps } from '../buildGraphFromDeps/buildGraphFromDeps';
import { reduceGraph } from '../reduceGraph/reduceGraph';

export const transitiveReductionToGraph = (
    dependencies: ProjectGraphDependencyWithFile[],
): Graph => {
    const graph = buildGraphFromDeps(dependencies);
    const reducedGraph = reduceGraph(graph);
    return reducedGraph;
};
