import { isWindows } from './isWindows';

describe('checkOs', () => {
    it('linux should be valid platform', () => {
        const isValidPlatform = isWindows('linux');
        expect(isValidPlatform).toBe(false);
    });

    it('macos should be valid platform', () => {
        const isValidPlatform = isWindows('darwin');
        expect(isValidPlatform).toBe(false);
    });

    it('windows should not be valid platform', () => {
        const isValidPlatform = isWindows('win32');
        expect(isValidPlatform).toBe(true);
    });
});
