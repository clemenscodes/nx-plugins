import { getCmockaInclude } from './getCmockaInclude';

describe('getCmockaInclude', () => {
    it('should return the cmocka include path', () => {
        const result = getCmockaInclude('libs');
        expect(result).toBe('dist/libs/cmocka/cmocka-src/include');
    });
});
