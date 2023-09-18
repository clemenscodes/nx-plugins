import { checkOs } from './checkOs';

describe('checkOs', () => {
    it('linux should be valid platform', () => {
        const isValidPlatform = checkOs('linux');
        expect(isValidPlatform).toBe(true);
    });

    it('macos should be valid platform', () => {
        const isValidPlatform = checkOs('darwin');
        expect(isValidPlatform).toBe(true);
    });

    it('windows should not be valid platform', () => {
        const isValidPlatform = checkOs('win32');
        expect(isValidPlatform).toBe(false);
    });
});
