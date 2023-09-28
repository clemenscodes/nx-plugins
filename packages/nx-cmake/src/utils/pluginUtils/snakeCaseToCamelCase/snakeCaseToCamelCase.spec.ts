import { snakeCaseToCamelCase } from './snakeCaseToCamelCase';

describe('snakeCaseToCamelCase', () => {
    it('converts snake_case string to camelCase', () => {
        const snakeCaseString = 'hello_world_example';
        const camelCaseString = snakeCaseToCamelCase(snakeCaseString);
        expect(camelCaseString).toBe('helloWorldExample');
    });

    it('handles empty string', () => {
        const emptyString = '';
        const camelCaseString = snakeCaseToCamelCase(emptyString);
        expect(camelCaseString).toBe('');
    });

    it('handles single-word input', () => {
        const singleWord = 'singleword';
        const camelCaseString = snakeCaseToCamelCase(singleWord);
        expect(camelCaseString).toBe('singleword');
    });

    it('handles input with leading underscore', () => {
        const inputWithLeadingUnderscore = '_underscore_start';
        const camelCaseString = snakeCaseToCamelCase(
            inputWithLeadingUnderscore,
        );
        expect(camelCaseString).toBe('underscoreStart');
    });
});
