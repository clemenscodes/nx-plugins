import { mapLinuxProgram } from './mapLinuxProgram';
import { GCC } from '../nx-cmake';

describe('mapLinuxProgram', () => {
    it('should map program to /usr/bin and /usr/local/bin paths', () => {
        const result = mapLinuxProgram(GCC);
        const expectedPaths = ['/usr/bin/gcc', '/usr/local/bin/gcc'];
        expect(result).toEqual(expectedPaths);
    });
});
