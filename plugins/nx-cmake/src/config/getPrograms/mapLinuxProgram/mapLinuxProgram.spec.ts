import { GCC } from '../getPrograms';
import { mapLinuxProgram } from './mapLinuxProgram';
import { join } from 'path';

describe('mapLinuxProgram', () => {
    it('should map program to /usr/bin and /usr/local/bin paths', () => {
        const result = mapLinuxProgram(GCC);
        const expectedPaths = [
            join('/usr/bin/gcc'),
            join('/usr/local/bin/gcc'),
        ];
        expect(result).toEqual(expectedPaths);
    });
});
