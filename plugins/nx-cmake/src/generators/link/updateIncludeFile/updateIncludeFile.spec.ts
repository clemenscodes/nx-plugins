import type { Tree } from '@nx/devkit';
import { updateIncludeFile } from './updateIncludeFile';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readFileWithTree } from '@/util';
import * as devkit from '@nx/devkit';
import { LibGeneratorSchema, LinkSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import initGenerator from '../../init/initGenerator';
import libGenerator from '../../library/libGenerator';

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
        expectedIncludeDirective = '#include "libtarget.h"';
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
            sourceProjectRoot: 'packages/link',
            targetProjectRoot: 'packages/target',
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
