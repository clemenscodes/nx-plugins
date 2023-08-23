import { getCMakeC } from './getCMakeC';

describe('getCMakeC', () => {
    test('should get the string for CMake C version', () => {
        expect(getCMakeC).toBeDefined();
    });
});
