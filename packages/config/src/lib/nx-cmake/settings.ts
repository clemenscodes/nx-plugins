import type { NxGeneratorConfig, NxPluginsConfig } from '@/types';
import type { C } from '.';
import { PLUGIN_NAME } from './name';

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
    workspaceName: string;
};

export type PluginConfig = {
    [PLUGIN_NAME]: NxCmakePluginConfig;
} & NxPluginsConfig;
