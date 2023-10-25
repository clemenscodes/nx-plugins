import type { RawProjectGraphDependency } from '@nx/devkit';
import { reduceDependencies } from './reduceDependencies/reduceDependencies';
import { transitiveReductionToGraph } from './transitiveReductionToGraph/transitiveReductionToGraph';

export const reduceDependenciesTransitively = (
    deps: RawProjectGraphDependency[],
): RawProjectGraphDependency[] => {
    const graph = transitiveReductionToGraph(deps);
    const reducedDependencies = reduceDependencies(graph, deps);
    return reducedDependencies;
};
