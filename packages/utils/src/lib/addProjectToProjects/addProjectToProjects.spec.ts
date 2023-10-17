import type { Tree } from '@nx/devkit';
import { addProjectToProjects } from './addProjectToProjects';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from '../initGenerator/initGenerator';
import { getDefaultInitGeneratorOptions } from '@/config';
import * as devkit from '@nx/devkit';

describe('addProjectToProjects', () => {
    let tree: Tree;
    let projectName: string;
    let projectRoot: string;
    let expectedProjectsFile: string;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        projectName = 'projectName';
        projectRoot = `bin/${projectName}`;
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        expectedProjectsFile =
            'set(PROJECTS)\n\n' + `list(APPEND PROJECTS ${projectRoot})`;
    });

    it('should add binary to projects', () => {
        let updatedProjectsFile = addProjectToProjects(
            tree,
            projectName,
            projectRoot,
        );
        expect(updatedProjectsFile).toStrictEqual(expectedProjectsFile);
        projectRoot += 2;
        updatedProjectsFile = addProjectToProjects(
            tree,
            projectName,
            projectRoot,
        );
        expect(updatedProjectsFile).toStrictEqual(
            expectedProjectsFile + `\nlist(APPEND PROJECTS ${projectRoot})`,
        );
    });
});
