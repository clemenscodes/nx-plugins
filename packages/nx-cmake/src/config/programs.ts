export const GCC = 'gcc';

export const LINUX_GCC = '/usr/bin/gcc';
export const LINUX_MAKE = '/usr/bin/make';
export const LINUX_CMAKE = '/usr/local/bin/cmake';
export const LINUX_CTEST = '/usr/local/bin/ctest';
export const LINUX_GDB = '/usr/local/bin/gdb';
export const LINUX_NASM = '/usr/local/bin/nasm';
export const LINUX_CLANG_TIDY = '/usr/bin/clang-tidy';
export const LINUX_CLANG_FORMAT = '/usr/bin/clang-format';

export const DARWIN_GCC = '/usr/local/bin/gcc-13';
export const DARWIN_MAKE = '/usr/bin/make';
export const DARWIN_CMAKE = '/usr/local/bin/cmake';
export const DARWIN_CTEST = '/usr/local/bin/ctest';
export const DARWIN_GDB = '/usr/local/bin/gdb';
export const DARWIN_NASM = '/usr/local/bin/nasm';
export const DARWIN_CLANG_TIDY = '/usr/local/bin/clang-tidy';
export const DARWIN_CLANG_FORMAT = '/usr/local/bin/clang-format';

export const WINDOWS_MSYS2_BASE_PATH = `C:/tools/msys64`;
export const WINDOWS_UCRT64_PATH = `${WINDOWS_MSYS2_BASE_PATH}/ucrt64`;
export const WINDOWS_UCRT64_BIN_PATH = `${WINDOWS_UCRT64_PATH}/bin`;

export const WINDOWS_GCC = `${WINDOWS_UCRT64_BIN_PATH}/gcc.exe`;
export const WINDOWS_MAKE = `${WINDOWS_UCRT64_BIN_PATH}/mingw32-make.exe`;
export const WINDOWS_CMAKE = `cmake`;
export const WINDOWS_CTEST = `ctest`;
export const WINDOWS_GDB = `${WINDOWS_UCRT64_BIN_PATH}/gdb.exe`;
export const WINDOWS_NASM = `${WINDOWS_UCRT64_BIN_PATH}/nasm.exe`;
export const WINDOWS_CLANG_FORMAT = `${WINDOWS_UCRT64_BIN_PATH}/clang-format.exe`;
export const WINDOWS_CLANG_TIDY = `${WINDOWS_UCRT64_BIN_PATH}/clang-tidy.exe`;
