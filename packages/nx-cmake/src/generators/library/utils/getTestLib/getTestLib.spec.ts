import type { C } from '../../../../models/types';
import { getTestLib } from './getTestLib';

describe('getTestLib', () => {
    it('should return "gtest" when the language is "C++"', () => {
        const language = 'C++';
        const expected = 'gtest';
        const result = getTestLib(language);
        expect(result).toBe(expected);
    });

    it('should return "cmocka" when the language is "C"', () => {
        const language = 'C';
        const expected = 'cmocka';
        const result = getTestLib(language);
        expect(result).toBe(expected);
    });

    it('should handle other languages and return "cmocka"', () => {
        const language = 'Java';
        const expected = 'cmocka';
        const result = getTestLib(language as C);
        expect(result).toBe(expected);
    });
});
