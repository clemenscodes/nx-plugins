import { getCmakeC } from './getCmakeC';

describe('getCmakeC', () => {
    it('should return "C" for input "C"', () => {
        const result = getCmakeC('C');
        expect(result).toBe('C');
    });

    it('should return "CXX" for input "C++"', () => {
        const result = getCmakeC('C++');
        expect(result).toBe('CXX');
    });
});
