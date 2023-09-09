import type { C, CMakeC, Link } from './types';

export interface BaseOptions {
    name: string;
    constantName: string;
    relativeRootPath: string;
    languageExtension: string;
    language: C;
    cmakeC: CMakeC;
    link: Link;
    skipFormat: boolean;
    project?: string;
}
