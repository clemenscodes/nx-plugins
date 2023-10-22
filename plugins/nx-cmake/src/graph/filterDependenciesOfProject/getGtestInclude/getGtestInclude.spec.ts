import { getGtestInclude } from './getGtestInclude';

describe('getGtestInclude', () => {
    it('should return the gtest include path', () => {
        const result = getGtestInclude('libs');
        expect(result).toBe(
            'dist/libs/gtest/googletest-src/googletest/include',
        );
    });
});
