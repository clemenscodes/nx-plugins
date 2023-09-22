import { detectTestFramework } from './detectTestFramework';

describe('detectTestFramework', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return true if message includes cmocka', () => {
        const message = '#include <cmocka.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return false if message does not include gtest or cmocka', () => {
        const message = 'Some other message';
        expect(detectTestFramework(message)).toBe(false);
    });
});
