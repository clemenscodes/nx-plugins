import type { Graph } from '../../../../models/types';
import { getTransitiveDependencies } from './getTransitiveDependencies';

describe('getTransitiveDependencies', () => {
    let graph: Graph;
    let node: string;
    let expectedTransitiveDependencies: Set<string>;

    beforeEach(() => {
        graph = {
            crap: new Set<string>().add('libcrap').add('libshit'),
            libcrap: new Set<string>().add('libshit').add('libshit'),
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
        node = 'testtrash';
        expectedTransitiveDependencies = new Set<string>().add('libtrash');
    });

    it.todo('fix this');
    // it('should get transitive dependencies', () => {
    //     const transitiveDependencies = getTransitiveDependencies(graph, node);
    //     expect(transitiveDependencies).toStrictEqual(
    //         expectedTransitiveDependencies
    //     );
    // });
});
