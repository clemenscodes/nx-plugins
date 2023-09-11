import type { C, CMakeC } from './types';

export type BaseOptions = {
    name: string;
    language: C;
    skipFormat: boolean;
    constantName?: string;
    relativeRootPath?: string;
    languageExtension?: string;
    cmakeC?: CMakeC;
};
