import type { NxJsonConfiguration, ProjectGraph } from '@nx/devkit';
import { PLUGIN_NAME } from '../config/pluginName';

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

export type WorkspaceLayout = NxJsonConfiguration['workspaceLayout'];

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
