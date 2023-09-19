import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { logger } from '@nx/devkit';
import { buildAdjacencyList } from '../buildAdjacencyList/buildAdjacencyList';
import { hasCyclicDependencies } from './hasCyclicDependencies';

describe('hasCyclicDependencies', () => {
    it.todo('should return true if cyclic dependencies are found');
    it.todo('should return false if no cyclic dependencies are found');
});
