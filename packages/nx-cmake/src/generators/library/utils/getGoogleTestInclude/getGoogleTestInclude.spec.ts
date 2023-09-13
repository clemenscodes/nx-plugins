import { getGoogleTestInclude } from './getGoogleTestInclude';

describe('getGoogleTestInclude', () => {
    it('should return an empty string when generateTests is false', () => {
        const generateTests = false;
        const language = 'C++';

        const result = getGoogleTestInclude(generateTests, language);

        expect(result).toBe('');
    });

    it('should return GoogleTest include when generateTests is true and language is C++', () => {
        const generateTests = true;
        const language = 'C++';

        const result = getGoogleTestInclude(generateTests, language);

        expect(result).toBe('include(GoogleTest)');
    });

    it('should return an empty string when generateTests is true but language is not C++', () => {
        const generateTests = true;
        const language = 'C';

        const result = getGoogleTestInclude(generateTests, language);

        expect(result).toBe('');
    });
});
