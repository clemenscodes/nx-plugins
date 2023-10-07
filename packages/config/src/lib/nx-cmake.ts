import type { Program, Programs } from './nx-cmake.types';
import { mapDarwinGcc } from './mapDarwinGcc/mapDarwinGcc';
import { mapLinuxProgram } from './mapLinuxProgram/mapLinuxProgram';
import { mapWindowsProgram } from './mapWindowsProgram/mapWindowsProgram';

export const PLUGIN_NAME = 'nx-cmake';

export const PROJECT_FILE = 'CMakeLists.txt';
export const PROJECT_FILE_PATTERN = `**/*/${PROJECT_FILE}`;

export const REQUIRED_MAJOR_NX_VERSION = 16;
export const REQUIRED_MINOR_NX_VERSION = 9;
export const REQUIRED_PATCH_NX_VERSION = 0;

export const GCC: Program = 'gcc';
export const MAKE: Program = 'make';
export const CMAKE: Program = 'cmake';
export const CTEST: Program = 'ctest';
export const GDB: Program = 'gdb';
export const NASM: Program = 'nasm';
export const CLANG_FORMAT: Program = 'clang-format';
export const CLANG_TIDY: Program = 'clang-tidy';

export const LINUX_GCC = mapLinuxProgram(GCC);
export const LINUX_MAKE = mapLinuxProgram(MAKE);
export const LINUX_CMAKE = mapLinuxProgram(CMAKE);
export const LINUX_CTEST = mapLinuxProgram(CTEST);
export const LINUX_GDB = mapLinuxProgram(GDB);
export const LINUX_NASM = mapLinuxProgram(NASM);
export const LINUX_CLANG_FORMAT = mapLinuxProgram(CLANG_FORMAT);
export const LINUX_CLANG_TIDY = mapLinuxProgram(CLANG_TIDY);

export const DARWIN_GCC = mapDarwinGcc();
export const DARWIN_MAKE = mapLinuxProgram(MAKE);
export const DARWIN_CMAKE = mapLinuxProgram(CMAKE);
export const DARWIN_CTEST = mapLinuxProgram(CTEST);
export const DARWIN_GDB = mapLinuxProgram(GDB);
export const DARWIN_NASM = mapLinuxProgram(NASM);
export const DARWIN_CLANG_FORMAT = mapLinuxProgram(CLANG_FORMAT);
export const DARWIN_CLANG_TIDY = mapLinuxProgram(CLANG_TIDY);

export const WINDOWS_GCC = mapWindowsProgram(GCC);
export const WINDOWS_MAKE = mapWindowsProgram(MAKE);
export const WINDOWS_CMAKE = mapWindowsProgram(CMAKE);
export const WINDOWS_CTEST = mapWindowsProgram(CTEST);
export const WINDOWS_GDB = mapWindowsProgram(GDB);
export const WINDOWS_NASM = mapWindowsProgram(NASM);
export const WINDOWS_CLANG_FORMAT = mapWindowsProgram(CLANG_FORMAT);
export const WINDOWS_CLANG_TIDY = mapWindowsProgram(CLANG_TIDY);

export const PROGRAMS: Programs = {
    ['gcc']: {
        linux: LINUX_GCC,
        darwin: DARWIN_GCC,
        windows: WINDOWS_GCC,
    } as const,
    ['make']: {
        linux: LINUX_MAKE,
        darwin: DARWIN_MAKE,
        windows: WINDOWS_MAKE,
    } as const,
    ['cmake']: {
        linux: LINUX_CMAKE,
        darwin: DARWIN_CMAKE,
        windows: WINDOWS_CMAKE,
    } as const,
    ['ctest']: {
        linux: LINUX_CTEST,
        darwin: DARWIN_CTEST,
        windows: WINDOWS_CTEST,
    } as const,
    ['gdb']: {
        linux: LINUX_GDB,
        darwin: DARWIN_GDB,
        windows: WINDOWS_GDB,
    } as const,
    ['nasm']: {
        linux: LINUX_NASM,
        darwin: DARWIN_NASM,
        windows: WINDOWS_NASM,
    } as const,
    ['clang-format']: {
        linux: LINUX_CLANG_FORMAT,
        darwin: DARWIN_CLANG_FORMAT,
        windows: WINDOWS_CLANG_FORMAT,
    } as const,
    ['clang-tidy']: {
        linux: LINUX_CLANG_TIDY,
        darwin: DARWIN_CLANG_TIDY,
        windows: WINDOWS_CLANG_TIDY,
    } as const,
} as const;

export enum CProjectType {
    App,
    Lib,
    Test,
}
