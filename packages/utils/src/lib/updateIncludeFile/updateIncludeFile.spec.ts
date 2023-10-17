import type { Tree } from '@nx/devkit';
import {
    getDefaultInitGeneratorOptions,
    type LibGeneratorSchema,
    type LinkSchema,
} from '@/config';
import { updateIncludeFile } from './updateIncludeFile';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import * as devkit from '@nx/devkit';
import { initGenerator } from '../initGenerator/initGenerator';

describe('updateIncludeFile', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let linkOptions: LinkSchema;
    let expectedIncludeFile: string;
    let expectedIncludeDirective: string;
    let expectedIncludeFileContent: string;
    let expectedUpdatedIncludeFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, libOptions);
        expectedIncludeFile = 'packages/link/include/liblink.h';
        expectedIncludeDirective = '#include <target/include/libtarget.h>';
        expectedIncludeFileContent =
            '#ifndef _LIBLINK_LINK\n#define _LIBLINK_LINK\n\nint link(void);\n\n#endif\n';
        expectedUpdatedIncludeFileContent =
            '#ifndef _LIBLINK_LINK\n#define _LIBLINK_LINK\n\n' +
            expectedIncludeDirective +
            '\n\nint link(void);' +
            '\n\n#endif\n';
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            sourceProjectRoot: 'packages/link',
        };
    });

    it('should update include file', () => {
        const includeFileContent = readFileWithTree(tree, expectedIncludeFile);
        expect(includeFileContent).toBe(expectedIncludeFileContent);
        updateIncludeFile(tree, linkOptions);
        const updatedIncludeFileContent = readFileWithTree(
            tree,
            expectedIncludeFile,
        );
        expect(updatedIncludeFileContent).toBe(
            expectedUpdatedIncludeFileContent,
        );
    });
});
