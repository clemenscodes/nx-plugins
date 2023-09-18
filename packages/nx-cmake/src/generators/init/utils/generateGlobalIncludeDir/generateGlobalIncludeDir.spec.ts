import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { generateGlobalIncludeDir } from './generateGlobalIncludeDir';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

describe('generateGlobalIncludeDir', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let commonFile: string;
    let libcmockaFile: string;
    let libgtestFile: string;
    let expectedCommonFile: string;
    let expectedLibcmockaFile: string;
    let expectedLibgtestFile: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        commonFile = 'include/common.h';
        libcmockaFile = 'include/libcmocka.h';
        libgtestFile = 'include/libgtest.h';
        expectedCommonFile = '#ifndef _COMMON\n#define _COMMON\n\n#endif\n';
        expectedLibcmockaFile =
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
        expectedLibgtestFile =
            '#ifndef _GTEST\n#define _GTEST\n\n#include <gtest/gtest.h>\n\n#endif\n';
    });

    it('should generate global include dir', async () => {
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
        generateGlobalIncludeDir(tree, options);
        const readCommonFile = tree.read(commonFile, 'utf-8');
        const readLibcmockaFile = tree.read(libcmockaFile, 'utf-8');
        const readLibgtestFile = tree.read(libgtestFile, 'utf-8');
        expect(readCommonFile).toStrictEqual(expectedCommonFile);
        expect(readLibcmockaFile).toStrictEqual(expectedLibcmockaFile);
        expect(readLibgtestFile).toStrictEqual(expectedLibgtestFile);
    });
});
