import { getRequiredVersionOfNx } from './getRequiredVersionOfNx';

describe('getRequiredVersionOfNx', () => {
    it('should get required of Nx', () => {
        const version = getRequiredVersionOfNx();
        expect(version).toBe('16.7.0');
    });
});
