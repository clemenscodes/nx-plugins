import { generateGlobalIncludeDir } from './generateGlobalIncludeDir';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { InitGeneratorSchema } from '../../schema';

describe('generateGlobalIncludeDir', () => {
    let tree: Tree;
    const commonFile = 'include/common.h';
    const libcmockaFile = 'include/libcmocka.h';
    const libgtestFile = 'include/libgtest.h';
    const expectedCommonFile = '#ifndef _COMMON\n#define _COMMON\n\n#endif\n';
    const expectedLibcmockaFile =
        '#ifndef _CMOCKA_H\n' +
        '#define _CMOCKA_H\n' +
        '\n' +
        '#include <stdint.h>\n' +
        '#include <stdarg.h>\n' +
        '#include <stddef.h>\n' +
        '#include <setjmp.h>\n' +
        '#include <cmocka.h>\n' +
        '\n' +
        '#endif\n';
    const expectedLibgtestFile =
        '#ifndef _GTEST\n#define _GTEST\n\n#include <gtest/gtest.h>\n\n#endif\n';

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate global include dir', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        generateGlobalIncludeDir(tree, options);
        const globalIncludeFiles = tree.children('include');
        const expectedGlobalIncludeFiles = [
            'common.h',
            'libcmocka.h',
            'libgtest.h',
        ];
        expect(globalIncludeFiles).toStrictEqual(expectedGlobalIncludeFiles);
    });

    it('should generate global include dir correctly', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        generateGlobalIncludeDir(tree, options);
        const readCommonFile = tree.read(commonFile, 'utf-8');
        const readLibcmockaFile = tree.read(libcmockaFile, 'utf-8');
        const readLibgtestFile = tree.read(libgtestFile, 'utf-8');
        expect(readCommonFile).toStrictEqual(expectedCommonFile);
        expect(readLibcmockaFile).toStrictEqual(expectedLibcmockaFile);
        expect(readLibgtestFile).toStrictEqual(expectedLibgtestFile);
    });
});
