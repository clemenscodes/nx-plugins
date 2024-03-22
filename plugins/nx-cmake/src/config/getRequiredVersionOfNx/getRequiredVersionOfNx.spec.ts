import { getRequiredVersionOfNx } from './getRequiredVersionOfNx';

describe('getRequiredVersionOfNx', () => {
    it('should get required of Nx', () => {
        const version = getRequiredVersionOfNx();
        expect(version).toBe('18.0.0');
    });
});
