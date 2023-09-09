import { getCMakeC } from './getCMakeC';

describe('getCMakeC', () => {
    it('should return "C" for input "C"', () => {
        const result = getCMakeC('C');
        expect(result).toBe('C');
    });

    it('should return "CXX" for input "C++"', () => {
        const result = getCMakeC('C++');
        expect(result).toBe('CXX');
    });
});
