import type { Tree } from '@nx/devkit';
import { addLibraryToLibraries } from './addLibraryToLibraries';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import * as devkit from '@nx/devkit';
import { getDefaultInitGeneratorOptions } from '../../config';
import initGenerator from '../../generators/init/initGenerator';

describe('addLibraryToLibraries', () => {
    let tree: Tree;
    let libraryName: string;
    let expectedLibrariesFile: string;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        libraryName = `libproject`;
        tree = createTreeWithEmptyWorkspace();
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
