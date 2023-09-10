import type { C, CMakeC, Link } from './types';

export type BaseOptions = {
    name: string;
    language: C;
    skipFormat: boolean;
    link: Link;
    constantName?: string;
    relativeRootPath?: string;
    languageExtension?: string;
    cmakeC?: CMakeC;
};
