import { isC } from './isC';

describe('isC', () => {
    it('should return true for "c" or "cpp"', () => {
        expect(isC('c')).toBe(true);
        expect(isC('cpp')).toBe(true);
    });

    it('should return false for other strings', () => {
        expect(isC('java')).toBe(false);
        expect(isC('python')).toBe(false);
    });
});
