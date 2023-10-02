export const LINUX_GCC = '/usr/bin/gcc';
export const LINUX_MAKE = '/usr/bin/make';
export const LINUX_CMAKE = '/usr/bin/cmake';
export const DARWIN_GCC = '/usr/local/bin/gcc-13';
export const DARWIN_MAKE = '/usr/bin/make';
export const DARWIN_CMAKE = '/usr/bin/cmake';
export const WINDOWS_MINGW_PATH = 'C:/ProgramData/mingw64/mingw64';
export const WINDOWS_MINGW_ARCH = 'x86_64-w64-mingw32';
export const WINDOWS_GCC = `${WINDOWS_MINGW_PATH}/bin/gcc.exe`;
export const WINDOWS_MAKE = `${WINDOWS_MINGW_PATH}/bin/mingw32-make.exe`;
export const WINDOWS_CMAKE = `C:/Program Files/CMake/bin/cmake.exe`;
export const WINDOWS_CXX_INCLUDES = [
    `${WINDOWS_MINGW_PATH}/lib/gcc/${WINDOWS_MINGW_ARCH}/13.1.0/include/c++`,
    `${WINDOWS_MINGW_PATH}/lib/gcc/${WINDOWS_MINGW_ARCH}/13.1.0/include/c++/${WINDOWS_MINGW_ARCH}`,
    `${WINDOWS_MINGW_PATH}/lib/gcc/${WINDOWS_MINGW_ARCH}/13.1.0/include`,
];
export const WINDOWS_C_INCLUDES = [
    `${WINDOWS_MINGW_PATH}/${WINDOWS_MINGW_ARCH}/include`,
];
