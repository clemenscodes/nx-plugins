import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { output } from '@nx/devkit';
import { hasCyclicDependencies } from './hasCyclicDependencies/hasCyclicDependencies';
import { reduceDependencies } from './reduceDependencies/reduceDependencies';
import { transitiveReductionToGraph } from './transitiveReductionToGraph/transitiveReductionToGraph';

export const reduceDependenciesTransitively = (
    deps: ProjectGraphDependencyWithFile[]
): ProjectGraphDependencyWithFile[] => {
    if (hasCyclicDependencies(deps)) {
        output.error({
            title: `Failed to optimize project graph`,
            bodyLines: [
                `You should resolve this circular dependency and then reset the project graph using 'nx reset'`,
            ],
        });
        return deps;
    }
    const graph = transitiveReductionToGraph(deps);
    const reducedDependencies = reduceDependencies(graph, deps);
    return reducedDependencies;
};
