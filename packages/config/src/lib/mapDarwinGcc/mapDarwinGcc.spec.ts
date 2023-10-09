import { mapDarwinGcc } from './mapDarwinGcc';
import { join } from 'path';

describe('mapDarwinGcc', () => {
    it('should map GCC versions correctly', () => {
        const result = mapDarwinGcc();
        const expectedPaths = [
            join('/usr/bin/gcc-8'),
            join('/usr/local/bin/gcc-8'),
            join('/usr/bin/gcc-9'),
            join('/usr/local/bin/gcc-9'),
            join('/usr/bin/gcc-10'),
            join('/usr/local/bin/gcc-10'),
            join('/usr/bin/gcc-11'),
            join('/usr/local/bin/gcc-11'),
            join('/usr/bin/gcc-12'),
            join('/usr/local/bin/gcc-12'),
            join('/usr/bin/gcc-13'),
            join('/usr/local/bin/gcc-13'),
        ];
        expect(result).toEqual(expectedPaths);
    });
});
