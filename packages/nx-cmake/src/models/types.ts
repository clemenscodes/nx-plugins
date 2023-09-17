import type { NxJsonConfiguration } from '@nx/devkit';

export type BaseOptions = {
    name: string;
    language: C;
    skipFormat: boolean;
    constantName?: string;
    snakeCaseName?: string;
    relativeRootPath?: string;
    languageExtension?: string;
    cmakeC?: CMakeC;
};

export type ExecutorBaseOptions = {
    args: string[];
};

export enum CProjectType {
    App,
    Lib,
    Test,
}

export type C = 'C' | 'C++';
export type CMakeC = 'C' | 'CXX';
export type CTag = 'c' | 'cpp';
export type Link = 'shared' | 'static';

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
