import { normalizeLineEndings } from './normalizeLineEndings';

describe('normalizeLineEndings', () => {
    it('Normalize line endings on Windows', () => {
        const input = 'This is a test\r\nstring';
        const expectedOutput = 'This is a test\nstring';
        expect(normalizeLineEndings(input)).toBe(expectedOutput);
    });

    it('Empty input should result in empty output', () => {
        const input = '';
        expect(normalizeLineEndings(input)).toBe(input);
    });
});
