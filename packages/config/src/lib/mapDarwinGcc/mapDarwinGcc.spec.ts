import { mapDarwinGcc } from './mapDarwinGcc';

describe('mapDarwinGcc', () => {
    it('should map GCC versions correctly', () => {
        const result = mapDarwinGcc();
        const expectedPaths = [
            '/usr/bin/gcc-8',
            '/usr/local/bin/gcc-8',
            '/usr/bin/gcc-9',
            '/usr/local/bin/gcc-9',
            '/usr/bin/gcc-10',
            '/usr/local/bin/gcc-10',
            '/usr/bin/gcc-11',
            '/usr/local/bin/gcc-11',
            '/usr/bin/gcc-12',
            '/usr/local/bin/gcc-12',
            '/usr/bin/gcc-13',
            '/usr/local/bin/gcc-13',
        ];
        expect(result).toEqual(expectedPaths);
    });
});
