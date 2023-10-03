import { isDarwin } from './isDarwin';

describe('checkOs', () => {
    it('linux should be valid platform', () => {
        const isValidPlatform = isDarwin('linux');
        expect(isValidPlatform).toBe(false);
    });

    it('macos should be valid platform', () => {
        const isValidPlatform = isDarwin('darwin');
        expect(isValidPlatform).toBe(true);
    });

    it('windows should not be valid platform', () => {
        const isValidPlatform = isDarwin('win32');
        expect(isValidPlatform).toBe(false);
    });
});
