import { WorkspaceLayout } from '../nx';
import { C, CMakeC, GoogleTestInclude, Link } from '.';

export type InitGeneratorSchema = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    addClangPreset: boolean;
    skipFormat: boolean;
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
    includeGoogleTest: GoogleTestInclude;
    baseTest: string;
};

export type LinkGeneratorSchema = {
    source: string;
    target: string;
    link: Link;
};

export type LinkSchema = LinkGeneratorSchema & {
    sourceProjectRoot: string;
};

export type BinGeneratorSchema = GeneratorBaseOptions & {
    generateTests: boolean;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
    linkOptions: LinkGeneratorSchema;
};
