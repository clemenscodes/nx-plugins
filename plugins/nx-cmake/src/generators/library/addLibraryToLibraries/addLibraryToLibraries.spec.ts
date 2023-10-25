import type { Tree } from '@nx/devkit';
import { addLibraryToLibraries } from './addLibraryToLibraries';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import initGenerator from '../../init/initGenerator';
import { setupWorkspace } from '@/mocks';

describe('addLibraryToLibraries', () => {
    let tree: Tree;
    let libraryName: string;
    let expectedLibrariesFile: string;

    beforeEach(async () => {
        tree = setupWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        expectedLibrariesFile =
            'set(LIBRARIES)\n\n' + `list(APPEND LIBRARIES ${libraryName})`;
    });

    it('should add binary to projects', () => {
        let updatedLibrariesFile = addLibraryToLibraries(tree, libraryName);
        expect(updatedLibrariesFile).toStrictEqual(expectedLibrariesFile);
        libraryName += 2;
        updatedLibrariesFile = addLibraryToLibraries(tree, libraryName);
        expect(updatedLibrariesFile).toStrictEqual(
            expectedLibrariesFile + `\nlist(APPEND LIBRARIES ${libraryName})`,
        );
    });
});
