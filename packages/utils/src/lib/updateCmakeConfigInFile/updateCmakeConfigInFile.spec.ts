import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibSchema, LinkSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { initGenerator } from '../initGenerator/initGenerator';
import { updateCmakeConfigInFile } from './updateCmakeConfigInFile';
import { resolveLinkOptions } from '../resolveLinkOptions/resolveLinkOptions';
import * as devkit from '@nx/devkit';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';

describe('updateCmakeConfigInFile', () => {
    let tree: Tree;
    let sourceLibOptions: LibGeneratorSchema;
    let resolvedSourceLibOptions: LibSchema;
    let targetLibOptions: LibGeneratorSchema;
    let resolvedTargetLibOptions: LibSchema;
    let linkOptions: LinkSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        sourceLibOptions = {
            name: 'source',
            language: 'C',
            generateTests: false,
        };
        resolvedSourceLibOptions = resolveLibOptions(sourceLibOptions);
        targetLibOptions = {
            name: 'target',
            language: 'C',
            generateTests: false,
        };
        resolvedTargetLibOptions = resolveLibOptions(targetLibOptions);
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
                'include(CMakeFindDependencyMacro)\n' +
                `include(\${ROOT}/dist/${resolvedSourceLibOptions.projectRoot}/${resolvedSourceLibOptions.libName}_Targets.cmake)\n` +
                '\n' +
                `list(APPEND CMAKE_PREFIX_PATH \${ROOT}/dist/${resolvedTargetLibOptions.projectRoot})\n` +
                `find_dependency(${resolvedTargetLibOptions.libName})\n`,
        );
    });
});
