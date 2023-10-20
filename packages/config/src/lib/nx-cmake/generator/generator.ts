import type { WorkspaceLayout } from '../../nx';
import type { C, CMakeC, GoogleTestInclude } from '..';

export type InitGeneratorSchema = {
    language: C;
    cmakeConfigDir: string;
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    addClangPreset: boolean;
    skipFormat: boolean;
    workspaceName: string;
};

export type InitSchema = InitGeneratorSchema & {
    relativeCmakeConfigPath: string;
    cmakeC: CMakeC;
};

export type GeneratorBaseOptions = {
    name: string;
    language: C;
    constantName?: string;
    snakeCaseName?: string;
    camelCaseName?: string;
    className?: string;
    relativeRootPath?: string;
    languageExtension?: string;
    cmakeConfigDir?: string;
    workspaceName?: string;
    cmakeC?: CMakeC;
};

export type LibGeneratorSchema = GeneratorBaseOptions & {
    generateTests: boolean;
};

export type LibSchema = Required<LibGeneratorSchema> & {
    testLib: 'gtest' | 'cmocka';
    setupTests: string;
    projectRoot: string;
    libName: string;
    testName: string;
    libsDir: string;
    includeGoogleTest: GoogleTestInclude;
    baseTest: string;
};

export type LinkGeneratorSchema = {
    source: string;
    target: string;
};

export type LinkSchema = LinkGeneratorSchema & {
    sourceProjectRoot: string;
    targetProjectRoot: string;
};

export type BinGeneratorSchema = GeneratorBaseOptions & {
    generateTests: boolean;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
    linkOptions: LinkGeneratorSchema;
};
