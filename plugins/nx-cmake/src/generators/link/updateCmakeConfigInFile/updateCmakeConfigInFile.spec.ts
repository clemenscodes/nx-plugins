import type { Tree } from '@nx/devkit';
import { updateCmakeConfigInFile } from './updateCmakeConfigInFile';
import { resolveLinkOptions } from '../resolveLinkOptions/resolveLinkOptions';
import initGenerator from '../../init/initGenerator';
import libGenerator from '../../library/libGenerator';
import { LibGeneratorSchema, LibSchema, LinkSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { resolveLibOptions } from '../../library/resolveLibOptions/resolveLibOptions';
import { setupWorkspace } from '@/mocks';

describe('updateCmakeConfigInFile', () => {
    let tree: Tree;
    let sourceLibOptions: LibGeneratorSchema;
    let resolvedSourceLibOptions: LibSchema;
    let targetLibOptions: LibGeneratorSchema;
    let resolvedTargetLibOptions: LibSchema;
    let linkOptions: LinkSchema;

    beforeEach(async () => {
        tree = setupWorkspace();
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
