import { GCC, MAKE } from '../nx-cmake';
import { join } from 'path';
import { mapWindowsProgram } from './mapWindowsProgram';

describe('mapWindowsProgram', () => {
    it('should map gcc to the correct paths', () => {
        const result = mapWindowsProgram(GCC);
        const expectedPaths = [
            join('C:/msys64/ucrt64/bin/gcc.exe'),
            join('C:/tools/msys64/ucrt64/bin/gcc.exe'),
        ];
        expect(result).toEqual(expectedPaths);
    });
    it('should handle make correctly', () => {
        const result = mapWindowsProgram(MAKE);
        const expectedPaths = [
            join('C:/msys64/ucrt64/bin/mingw32-make.exe'),
            join('C:/tools/msys64/ucrt64/bin/mingw32-make.exe'),
        ];
        expect(result).toEqual(expectedPaths);
    });
});
