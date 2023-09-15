import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateClangPreset } from './generateClangPreset';
import { InitGeneratorSchema } from '../../schema';
import { readFileWithTree } from '../../../../utils/generatorUtils/readFileWithTree/readFileWithTree';

describe('generateClangPreset', () => {
    let tree: Tree;
    const clangFormatFile = '.clang-format';
    const clangTidyFile = '.clang-tidy';
    const expectedClangTidyFileContent = '';
    const expectedClangFormatFileContent =
        'BasedOnStyle: LLVM\n' +
        'Language: Cpp\n' +
        'IndentWidth: 4\n' +
        'TabWidth: 4\n' +
        'UseTab: Never\n' +
        'ColumnLimit: 80\n' +
        'IndentCaseLabels: true\n' +
        'SortIncludes: false\n' +
        'BreakStringLiterals: false\n' +
        'MaxEmptyLinesToKeep: 1\n' +
        'AllowShortIfStatementsOnASingleLine: false\n' +
        'AllowShortFunctionsOnASingleLine: Empty\n' +
        'AllowShortCaseLabelsOnASingleLine: false\n' +
        'AllowShortLoopsOnASingleLine: false\n' +
        'AllowShortBlocksOnASingleLine: false\n' +
        'AlignConsecutiveAssignments: false\n' +
        'AlignTrailingComments: true\n' +
        'PointerAlignment: Right\n' +
        'ReferenceAlignment: Right\n' +
        'EmptyLineBeforeAccessModifier: Always\n' +
        'SeparateDefinitionBlocks: Always\n' +
        'SpaceBeforeAssignmentOperators: true\n' +
        'SpaceBeforeParens: ControlStatements\n' +
        'SpaceInEmptyParentheses: false\n' +
        'SpacesInAngles: false\n' +
        'SpacesInCStyleCastParentheses: false\n' +
        'SpacesInContainerLiterals: false\n' +
        'SpacesInParentheses: false\n' +
        'SpacesInSquareBrackets: false\n' +
        'BraceWrapping:\n' +
        '    AfterClass: false\n' +
        '    AfterControlStatement: false\n' +
        '    AfterEnum: false\n' +
        '    AfterFunction: false\n' +
        '    AfterNamespace: false\n' +
        '    AfterObjCDeclaration: false\n' +
        '    AfterStruct: false\n' +
        '    AfterUnion: false\n' +
        '    AfterExternBlock: false\n' +
        '    SplitEmptyFunction: false\n' +
        '    AfterCaseLabel: true\n';

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should not generate clang preset when addClangPreset is false', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        generateClangPreset(tree, options);
        expect(tree.exists('.clang-format')).toBe(false);
        expect(tree.exists('.clang-tidy')).toBe(false);
    });

    it('should generate clang preset when addClangFormatPreset is true', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: true,
            skipFormat: false,
        };
        generateClangPreset(tree, options);
        expect(tree.exists('.clang-format')).toBe(true);
        expect(tree.exists('.clang-tidy')).toBe(true);
    });

    it('should generate clang preset correctly', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: true,
            skipFormat: false,
        };
        generateClangPreset(tree, options);
        const clangFileContent = readFileWithTree(tree, clangFormatFile);
        const clangTidyContent = readFileWithTree(tree, clangTidyFile);
        expect(clangFileContent).toStrictEqual(expectedClangFormatFileContent);
        expect(clangTidyContent).toStrictEqual(expectedClangTidyFileContent);
    });
});
