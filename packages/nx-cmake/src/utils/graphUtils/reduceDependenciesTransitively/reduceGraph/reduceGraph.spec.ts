import type { Graph } from '../../../../models/types';
import { reduceGraph } from './reduceGraph';

describe('reduceGraph', () => {
    let graph: Graph;
    let expectedReducedGraph: Graph;

    beforeEach(() => {
        graph = {
            testcc: new Set<string>().add('libcc'),
            libcc: new Set<string>(),
            testbb: new Set<string>().add('libbb').add('libcc'),
            libbb: new Set<string>().add('libcc'),
            cc: new Set<string>().add('libcc'),
            bb: new Set<string>().add('libbb').add('libcc'),
        };
        expectedReducedGraph = {
            testcc: new Set<string>().add('libcc'),
            libcc: new Set<string>(),
            testbb: new Set<string>().add('libbb'),
            libbb: new Set<string>().add('libcc'),
            cc: new Set<string>().add('libcc'),
            bb: new Set<string>().add('libbb'),
        };
    });

    it('should reduce graph', () => {
        const reducedGraph = reduceGraph(graph);
        expect(reducedGraph).toStrictEqual(expectedReducedGraph);
    });
});
