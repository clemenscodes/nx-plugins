import type { Graph } from '../../../../models/types';
import { reduceGraph } from './reduceGraph';

describe('reduceGraph', () => {
    let graph: Graph;
    let expectedReducedGraph: Graph;

    beforeEach(() => {
        graph = {
            crap: new Set<string>().add('libcrap').add('libshit'),
            libcrap: new Set<string>().add('libshit'),
            libshit: new Set<string>(),
            libtrash: new Set<string>().add('libcrap').add('libshit'),
            shit: new Set<string>().add('libshit'),
            testcrap: new Set<string>().add('libcrap').add('libshit'),
            testshit: new Set<string>().add('libshit'),
            testtrash: new Set<string>()
                .add('libtrash')
                .add('libcrap')
                .add('libshit'),
        };
        expectedReducedGraph = {
            crap: new Set<string>().add('libcrap'),
            libcrap: new Set<string>().add('libshit'),
            libshit: new Set<string>(),
            libtrash: new Set<string>().add('libcrap'),
            shit: new Set<string>().add('libshit'),
            testcrap: new Set<string>().add('libcrap'),
            testshit: new Set<string>().add('libshit'),
            testtrash: new Set<string>().add('libtrash'),
        };
    });

    it('should reduce graph', () => {
        const reducedGraph = reduceGraph(graph);
        expect(reducedGraph).toStrictEqual(expectedReducedGraph);
    });
});
