import type { Graph } from '../../../../models/types';
import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { buildGraphFromDeps } from '../buildGraphFromDeps/buildGraphFromDeps';
import { reduceGraph } from '../reduceGraph/reduceGraph';
import { transitiveReductionToGraph } from './transitiveReductionToGraph';

describe('transitiveReductionToGraph', () => {
    it.todo('should perform transitive reduction to graph');
});
