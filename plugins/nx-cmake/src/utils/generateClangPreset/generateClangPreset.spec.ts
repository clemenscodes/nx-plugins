import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateClangPreset } from './generateClangPreset';
import { readFileWithTree } from '@/util';
import {
    InitGeneratorSchema,
    getDefaultInitGeneratorOptions,
    CLANG_FORMAT_CONFIG_FILE,
    CLANG_TIDY_CONFIG_FILE,
} from '../../config';

describe('generateClangPreset', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let expectedClangTidyFileContent: string;
    let expectedClangFormatFileContent: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = getDefaultInitGeneratorOptions();
        expectedClangTidyFileContent =
            "Checks: 'clang-diagnostic-*,clang-analyzer-*'\n" +
            "WarningsAsErrors: ''\n" +
            "HeaderFilterRegex: ''\n" +
            'AnalyzeTemporaryDtors: false\n' +
            'FormatStyle: none\n';
        expectedClangFormatFileContent =
            'BasedOnStyle: LLVM\n' +
            'Language: Cpp\n' +
            'IndentWidth: 4\n' +
            'TabWidth: 4\n' +
            'UseTab: Never\n' +
            'ColumnLimit: 80\n' +
            'IndentCaseLabels: true\n' +
            'SortIncludes: false\n' +
            'BreakStringLiterals: false\n' +
            'BinPackArguments: false\n' +
            'BinPackParameters: false\n' +
            'ExperimentalAutoDetectBinPacking: false\n' +
            'AllowAllParametersOfDeclarationOnNextLine: false\n' +
            'AllowAllArgumentsOnNextLine: false\n' +
            'AlignAfterOpenBracket: BlockIndent\n' +
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
    });

    it('should not generate clang preset when addClangPreset is false', async () => {
        options.addClangPreset = false;
        generateClangPreset(tree, options);
        expect(tree.exists(CLANG_FORMAT_CONFIG_FILE)).toBe(false);
        expect(tree.exists(CLANG_TIDY_CONFIG_FILE)).toBe(false);
    });

    it('should generate clang preset when addClangFormatPreset is true', async () => {
        generateClangPreset(tree, options);
        expect(tree.exists(CLANG_FORMAT_CONFIG_FILE)).toBe(true);
        expect(tree.exists(CLANG_TIDY_CONFIG_FILE)).toBe(true);
    });

    it('should generate clang preset correctly', async () => {
        generateClangPreset(tree, options);
        const clangFileContent = readFileWithTree(
            tree,
            CLANG_FORMAT_CONFIG_FILE,
        );
        const clangTidyContent = readFileWithTree(tree, CLANG_TIDY_CONFIG_FILE);
        expect(clangFileContent).toStrictEqual(expectedClangFormatFileContent);
        expect(clangTidyContent).toStrictEqual(expectedClangTidyFileContent);
    });
});
