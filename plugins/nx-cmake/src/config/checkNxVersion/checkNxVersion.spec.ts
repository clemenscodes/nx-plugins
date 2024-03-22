import { checkNxVersion } from './checkNxVersion';

describe('checkNxVersion', () => {
    it('should return true when version is greater than or equal to required version', () => {
        expect(checkNxVersion('16.9.0')).toBe(false);
        expect(checkNxVersion('17.0.0')).toBe(false);
        expect(checkNxVersion('18.0.0')).toBe(true);
    });

    it('should return false when major version is less than required major version', () => {
        expect(checkNxVersion('15.8.0')).toBe(false);
        expect(checkNxVersion('14.7.0')).toBe(false);
        expect(checkNxVersion('0.0.0')).toBe(false);
    });

    it('should return false when major version is equal but minor version is less', () => {
        expect(checkNxVersion('16.6.0')).toBe(false);
        expect(checkNxVersion('16.0.10')).toBe(false);
    });

    it('should return false when version is not in the correct format', () => {
        expect(checkNxVersion('2.0')).toBe(false);
        expect(checkNxVersion('2')).toBe(false);
        expect(checkNxVersion('abc')).toBe(false);
    });
});
