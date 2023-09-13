import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateClangFormatPreset } from './generateClangFormatPreset';
import { InitGeneratorSchema } from '../../schema';

describe('generateClangFormatPreset', () => {
    let tree: Tree;
    const clangFormatFile = '.clang-format';
    const expectedClangFormatFile =
        'BasedOnStyle: LLVM\n' +
        'Language: Cpp\n' +
        'IndentWidth: 4\n' +
        'TabWidth: 4\n' +
        'UseTab: Never\n' +
        'InsertBraces: true\n' +
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

    it('should not generate clang format preset when addClangFormatPreset is false', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: false,
            skipFormat: false,
        };
        generateClangFormatPreset(tree, options);
        expect(tree.exists('.clang-format')).toBe(false);
    });

    it('should generate clang format preset when addClangFormatPreset is true', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: true,
            skipFormat: false,
        };
        generateClangFormatPreset(tree, options);
        expect(tree.exists('.clang-format')).toBe(true);
    });

    it('should generate clang format preset correctly', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: true,
            skipFormat: false,
        };
        generateClangFormatPreset(tree, options);
        const readClangFormatFile = tree.read(clangFormatFile, 'utf-8');
        expect(readClangFormatFile).toStrictEqual(expectedClangFormatFile);
    });
});
