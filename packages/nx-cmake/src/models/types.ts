import type { NxJsonConfiguration, ProjectGraphProjectNode } from '@nx/devkit';

export type BaseOptions = {
    name: string;
    language: C;
    skipFormat: boolean;
    constantName?: string;
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
    type: ProjectGraphProjectNode['type'];
    tag: CTag;
};

export type WorkspaceLayout = NxJsonConfiguration['workspaceLayout'];
