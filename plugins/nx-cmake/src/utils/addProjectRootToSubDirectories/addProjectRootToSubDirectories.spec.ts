import type { Tree } from '@nx/devkit';
import { addProjectRootToSubDirectories } from './addProjectRootToSubDirectories';
import initGenerator from '../../generators/init/initGenerator';
import { getDefaultInitGeneratorOptions } from '../../generators/init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { setupWorkspace } from '@/mocks';

describe('addProjectRootToSubDirectories', () => {
    let tree: Tree;
    let projectRoot: string;
    let expectedSubDirectoriesFile: string;

    beforeEach(async () => {
        projectRoot = `bin/project`;
        tree = setupWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        expectedSubDirectoriesFile =
            'set(SUB_DIRECTORIES)\n\n' +
            `list(APPEND SUB_DIRECTORIES ${projectRoot})`;
    });

    it('should add binary to projects', () => {
        let updatedProjectsFile = addProjectRootToSubDirectories(
            tree,
            projectRoot,
        );
        expect(updatedProjectsFile).toStrictEqual(expectedSubDirectoriesFile);
        projectRoot += 2;
        updatedProjectsFile = addProjectRootToSubDirectories(tree, projectRoot);
        expect(updatedProjectsFile).toStrictEqual(
            expectedSubDirectoriesFile +
                `\nlist(APPEND SUB_DIRECTORIES ${projectRoot})`,
        );
    });
});
