import type { Graph } from '../../../../models/types';
import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { buildGraphFromDeps } from '../buildGraphFromDeps/buildGraphFromDeps';
import { reduceGraph } from '../reduceGraph/reduceGraph';

export const transitiveReductionToGraph = (
    dependencies: ProjectGraphDependencyWithFile[]
): Graph => {
    console.log({ dependencies });
    const graph = buildGraphFromDeps(dependencies);
    console.log({ graph });
    const reducedGraph = reduceGraph(graph);
    return reducedGraph;
};
