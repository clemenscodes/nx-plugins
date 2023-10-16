import type { Tree } from '@nx/devkit';
import { addBinaryToProjects } from './addBinaryToProjects';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from '../initGenerator/initGenerator';
import { getDefaultInitGeneratorOptions } from '@/config';
import * as devkit from '@nx/devkit';

describe('addBinaryToProjects', () => {
    let tree: Tree;
    let projectName: string;
    let expectedProjectsFile: string;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        projectName = 'projectName';
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        expectedProjectsFile =
            'set(PROJECTS)\n\n' + `list(APPEND PROJECTS ${projectName})`;
    });

    it('should add binary to projects', () => {
        let updatedProjectsFile = addBinaryToProjects(tree, projectName);
        expect(updatedProjectsFile).toStrictEqual(expectedProjectsFile);
        updatedProjectsFile = addBinaryToProjects(tree, projectName + 2);
        expect(updatedProjectsFile).toStrictEqual(
            expectedProjectsFile + `\nlist(APPEND PROJECTS ${projectName + 2})`,
        );
    });
});
