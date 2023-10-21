import { CProjectType } from './cProjectType';

export type Graph = Record<string, Set<string>>;

export type C = 'C' | 'C++';

export type CMakeC = 'C' | 'CXX';

export type CTag = 'c' | 'cpp';

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
