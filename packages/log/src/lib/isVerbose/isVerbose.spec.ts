import { isVerbose } from './isVerbose';

describe('isVerbose', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return false if NX_VERBOSE_LOGGING is false', () => {
        process.env['NX_VERBOSE_LOGGING'] = 'false';
        expect(isVerbose()).toBe(false);
    });

    it('should return true if NX_VERBOSE_LOGGING is true', () => {
        process.env['NX_VERBOSE_LOGGING'] = 'true';
        expect(isVerbose()).toBe(true);
    });
});
