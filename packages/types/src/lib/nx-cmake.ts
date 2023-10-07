import type { NxJsonConfiguration, ProjectGraph } from '@nx/devkit';
import {
    DARWIN_CLANG_FORMAT,
    DARWIN_CLANG_TIDY,
    DARWIN_CMAKE,
    DARWIN_CTEST,
    DARWIN_GCC,
    DARWIN_GDB,
    DARWIN_MAKE,
    DARWIN_NASM,
    LINUX_CLANG_FORMAT,
    LINUX_CLANG_TIDY,
    LINUX_CMAKE,
    LINUX_CTEST,
    LINUX_GCC,
    LINUX_GDB,
    LINUX_MAKE,
    LINUX_NASM,
    PLUGIN_NAME,
    WINDOWS_CLANG_FORMAT,
    WINDOWS_CLANG_TIDY,
    WINDOWS_CMAKE,
    WINDOWS_CTEST,
    WINDOWS_GCC,
    WINDOWS_GDB,
    WINDOWS_MAKE,
    WINDOWS_NASM,
} from '@/config';

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

export enum CProjectType {
    App,
    Lib,
    Test,
}

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

export type Platforms = {
    readonly linux: string;
    readonly darwin: string;
    readonly windows: string;
};

export type Program =
    | 'gcc'
    | 'make'
    | 'cmake'
    | 'ctest'
    | 'gdb'
    | 'nasm'
    | 'clangFormat'
    | 'clangTidy';

export type Programs = Readonly<Record<Program, Platforms>>;

export const PROGRAMS: Programs = {
    gcc: {
        linux: LINUX_GCC,
        darwin: DARWIN_GCC,
        windows: WINDOWS_GCC,
    } as const,
    make: {
        linux: LINUX_MAKE,
        darwin: DARWIN_MAKE,
        windows: WINDOWS_MAKE,
    } as const,
    cmake: {
        linux: LINUX_CMAKE,
        darwin: DARWIN_CMAKE,
        windows: WINDOWS_CMAKE,
    } as const,
    ctest: {
        linux: LINUX_CTEST,
        darwin: DARWIN_CTEST,
        windows: WINDOWS_CTEST,
    } as const,
    gdb: {
        linux: LINUX_GDB,
        darwin: DARWIN_GDB,
        windows: WINDOWS_GDB,
    } as const,
    nasm: {
        linux: LINUX_NASM,
        darwin: DARWIN_NASM,
        windows: WINDOWS_NASM,
    } as const,
    clangFormat: {
        linux: LINUX_CLANG_FORMAT,
        darwin: DARWIN_CLANG_FORMAT,
        windows: WINDOWS_CLANG_FORMAT,
    } as const,
    clangTidy: {
        linux: LINUX_CLANG_TIDY,
        darwin: DARWIN_CLANG_TIDY,
        windows: WINDOWS_CLANG_TIDY,
    } as const,
} as const;
