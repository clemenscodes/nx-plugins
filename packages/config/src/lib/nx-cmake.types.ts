import type { NxJsonConfiguration, ProjectGraph } from '@nx/devkit';
import { CProjectType, PLUGIN_NAME } from './nx-cmake';

export type Platforms = Readonly<{
    linux: ReadonlyArray<string>;
    darwin: ReadonlyArray<string>;
    windows: ReadonlyArray<string>;
}>;

export type Program =
    | 'gcc'
    | 'make'
    | 'cmake'
    | 'ctest'
    | 'gdb'
    | 'nasm'
    | 'clang-format'
    | 'clang-tidy';

export type Programs = Readonly<Record<Program, Platforms>>;

export type GoogleTestInclude = 'include(GoogleTest)' | '';

export type LibGeneratorSchema = BaseOptions & {
    generateTests: boolean;
};

export type LibOptions = Required<LibGeneratorSchema> & {
    testLib: 'gtest' | 'cmocka';
    setupTests: string;
    projectRoot: string;
    libName: string;
    testName: string;
    includeGoogleTest: GoogleTestInclude;
    baseTest: string;
};

export type BinGeneratorSchema = BaseOptions & {
    generateTests: boolean;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
    linkOptions: LinkGeneratorSchema;
};

export type LinkGeneratorSchema = {
    source: string;
    target: string;
    link: Link;
};

export type LinkSchema = LinkGeneratorSchema & {
    sourceProjectRoot: string;
};

export type InitGeneratorSchema = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    addClangPreset: boolean;
    skipFormat: boolean;
};

export type NxPluginsConfig = NxJsonConfiguration['pluginsConfig'];

export type NxGeneratorConfig = NxJsonConfiguration['generators'];

export type NxCmakePluginConfig = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
};

export type BaseGeneratorOptions = {
    language: C;
    generateTests: boolean;
};

export type BinaryGeneratorOptions = BaseGeneratorOptions;

export type LibraryGeneratorOptions = BaseGeneratorOptions;

export type NxCmakeGeneratorConfig = {
    binary: BinaryGeneratorOptions;
    library: LibraryGeneratorOptions;
};

export type PluginConfig = {
    [PLUGIN_NAME]: NxCmakePluginConfig;
} & NxPluginsConfig;

export type PluginGeneratorConfig = {
    [PLUGIN_NAME]: NxCmakeGeneratorConfig;
} & NxGeneratorConfig;

export type BaseOptions = {
    name: string;
    language: C;
    constantName?: string;
    snakeCaseName?: string;
    camelCaseName?: string;
    className?: string;
    relativeRootPath?: string;
    languageExtension?: string;
    cmakeC?: CMakeC;
};

export type ExecutorBaseOptions = {
    args: string[];
    release: boolean;
};

export type Deps = {
    sourceProject: string;
    dependsOnProject: string;
    file: string;
};

export type FilteredProject = {
    name: string;
    root: string;
    sourceRoot: string;
    type: CProjectType;
    tag: CTag;
};

export type WorkspaceLayout = Required<
    NonNullable<NxJsonConfiguration['workspaceLayout']>
>;

export type Graph = Record<string, Set<string>>;

export type GraphFile = {
    graph: {
        nodes: ProjectGraph['nodes'];
        dependencies: ProjectGraph['dependencies'];
    };
};

export type C = 'C' | 'C++';

export type CMakeC = 'C' | 'CXX';

export type CTag = 'c' | 'cpp';

export type Link = 'shared' | 'static';

export type CmakeExecutorSchema = ExecutorBaseOptions;

export type BuildExecutorSchema = ExecutorBaseOptions;

export type DebugExecutorSchema = ExecutorBaseOptions;

export type ExecuteExecutorSchema = ExecutorBaseOptions;

export type FormatExecutorSchema = Omit<ExecutorBaseOptions, 'release'> & {
    verbose: boolean;
    editFilesInPlace: boolean;
};

export type LintExecutorSchema = ExecutorBaseOptions;

export type TestExecutorSchema = ExecutorBaseOptions & {
    outputOnFailure: boolean;
};
