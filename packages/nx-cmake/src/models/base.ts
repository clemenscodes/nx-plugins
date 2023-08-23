import type { C, CMakeC, Link } from './types';

export interface BaseOptions {
    name: string;
    upperName: string;
    relativeRootPath: string;
    languageExtension: string;
    language: C;
    cmakeC: CMakeC;
    link: Link;
    skipFormat: boolean;
    project?: string;
}
