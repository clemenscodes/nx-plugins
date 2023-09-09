import { trimLib } from './trimLib';

describe('trimLib', () => {
    it('should remove "lib" prefix from a string', () => {
        const input = 'libexample';
        const result = trimLib(input);
        expect(result).toBe('example');
    });

    it('should not modify a string without "lib" prefix', () => {
        const input = 'example';
        const result = trimLib(input);
        expect(result).toBe('example');
    });

    it('should handle an empty string', () => {
        const input = '';
        const result = trimLib(input);
        expect(result).toBe('');
    });
});
