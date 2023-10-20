import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LinkSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { initGenerator } from '../initGenerator/initGenerator';
import { updateCmakeConfigInFile } from './updateCmakeConfigInFile';
import { resolveLinkOptions } from '../resolveLinkOptions/resolveLinkOptions';
import * as devkit from '@nx/devkit';

describe('updateCmakeConfigInFile', () => {
    let tree: Tree;
    let sourceLibOptions: LibGeneratorSchema;
    let targetLibOptions: LibGeneratorSchema;
    let linkOptions: LinkSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        sourceLibOptions = {
            name: 'source',
            language: 'C',
            generateTests: false,
        };
        targetLibOptions = {
            name: 'target',
            language: 'C',
            generateTests: false,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, sourceLibOptions);
        await libGenerator(tree, targetLibOptions);
        linkOptions = resolveLinkOptions(tree, {
            source: 'libsource',
            target: 'libtarget',
        });
    });

    it('should update cmake config in file', () => {
        const result = updateCmakeConfigInFile(tree, linkOptions);
        expect(result).toStrictEqual(
            '@PACKAGE_INIT@\n' +
                '\n' +
                'include(${ROOT}/dist/packages/source/libsource-export-Config.cmake)\n' +
                'include(CMakeFindDependencyMacro)\n' +
                '\n' +
                'list(APPEND CMAKE_PREFIX_PATH ${ROOT}/dist/packages/target)\n' +
                'find_dependency(libtarget)\n',
        );
    });
});
