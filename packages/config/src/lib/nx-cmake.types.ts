import type {
    NxJsonConfiguration,
    ProjectGraph,
    TargetConfiguration,
} from '@nx/devkit';
import { CProjectType, PLUGIN_NAME } from './nx-cmake';
import {
    BuildTargetName,
    BuildTargetConfiguration,
} from './getTargets/getBuildTarget/getBuildTarget';
import {
    LintTargetConfiguration,
    LintTargetName,
} from './getTargets/getLintTarget/getLintTarget';
import {
    FmtTargetName,
    FmtTargetConfiguration,
} from './getTargets/getFmtTarget/getFmtTarget';
import {
    TestTargetName,
    TestTargetConfiguration,
} from './getTargets/getTestTarget/getTestTarget';
import {
    ExecuteTargetConfiguration,
    ExecuteTargetName,
} from './getTargets/getExecuteTargets/getExecuteTargets';
import {
    DebugTargetConfiguration,
    DebugTargetName,
} from './getTargets/getDebugTargets/getDebugTargets';
import {
    CmakeTargetConfiguration,
    CmakeTargetName,
} from './getTargets/getCmakeTarget/getCmakeTarget';

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

export type GeneratorBaseOptions = {
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

export type LibGeneratorSchema = GeneratorBaseOptions & {
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

export type ExecutorBaseOptions = {
    args: string[];
    release: boolean;
};

export type BinGeneratorSchema = GeneratorBaseOptions & {
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

export type BaseGeneratorOptions = {
    language: C;
    generateTests: boolean;
};

export type BinaryGeneratorOptions = BaseGeneratorOptions;

export type LibraryGeneratorOptions = BaseGeneratorOptions;

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

export type GoogleTestInclude = 'include(GoogleTest)' | '';

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

export type NxPluginsConfig = NxJsonConfiguration['pluginsConfig'];

export type NxGeneratorConfig = NxJsonConfiguration['generators'];

export type NxTargetDefaults = NxJsonConfiguration['targetDefaults'];

export type NxCmakePluginConfig = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
};

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

export type TargetName =
    | CmakeTargetName
    | BuildTargetName
    | LintTargetName
    | FmtTargetName
    | TestTargetName
    | ExecuteTargetName
    | DebugTargetName;

export type PluginDefaults = {
    cmake: CmakeTargetConfiguration;
    build: BuildTargetConfiguration;
    fmt: FmtTargetConfiguration;
    lint: LintTargetConfiguration;
    test: TestTargetConfiguration;
    execute: ExecuteTargetConfiguration;
    debug: DebugTargetConfiguration;
};

export type TargetConfigurationWithDependsOn = TargetConfiguration & {
    dependsOn: NonNullable<TargetConfiguration['dependsOn']>;
};

export type TargetConfigurationWithInputs = TargetConfiguration & {
    inputs: NonNullable<TargetConfiguration['inputs']>;
};

export type TargetDefaultsWithDependsOn = Record<
    string,
    TargetConfigurationWithDependsOn
>;

export type TargetDefaultsWithInputs = Record<
    string,
    TargetConfigurationWithInputs
>;
