import { NxGeneratorConfig, NxPluginsConfig } from '../nx';
import { PLUGIN_NAME } from './name';
import { C } from '.';

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

export type PluginGeneratorConfig = {
    [PLUGIN_NAME]: NxCmakeGeneratorConfig;
} & NxGeneratorConfig;

export type NxCmakePluginConfig = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
    workspaceName: string;
};

export type PluginConfig = {
    [PLUGIN_NAME]: NxCmakePluginConfig;
} & NxPluginsConfig;
