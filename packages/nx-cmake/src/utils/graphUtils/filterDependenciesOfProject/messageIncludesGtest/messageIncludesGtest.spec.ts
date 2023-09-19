import { messageIncludesGtest } from './messageIncludesGtest';

describe('messageIncludesGtest', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(messageIncludesGtest(message)).toBe(true);
    });

    it('should return false if message does not include gtest', () => {
        const message = 'Some other message';
        expect(messageIncludesGtest(message)).toBe(false);
    });
});
