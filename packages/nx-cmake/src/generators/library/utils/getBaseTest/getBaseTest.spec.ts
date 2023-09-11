import { readFileSync } from 'fs';
import { join } from 'path';
import { getBaseTest } from './getBaseTest';

describe('getBaseTest', () => {
    it('should return an empty string when generateTests is false', () => {
        const generateTests = false;
        const language = 'C++';
        const libName = 'MyLib';
        const projectName = 'MyProject';

        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );

        expect(result).toBe('');
    });

    it('should return baseGtest when generateTests is true and language is C++', () => {
        const generateTests = true;
        const language = 'C++';
        const libName = 'libgui';
        const projectName = 'gui';

        const expected = readFileSync(
            join(__dirname, '..', 'getBaseGoogleTest', 'expected.txt'),
            {
                encoding: 'utf-8',
            }
        ).replace(/ {4}/g, '\t');

        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );

        expect(result).toBe(expected);
    });

    it('should return baseCmocka when generateTests is true and language is not C++', () => {
        const generateTests = true;
        const language = 'C';
        const libName = 'libparser';
        const projectName = 'parser';

        const expected = readFileSync(
            join(__dirname, '..', 'getBaseCmockaTest', 'expected.txt'),
            {
                encoding: 'utf-8',
            }
        ).replace(/ {4}/g, '\t');

        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );

        expect(result).toBe(expected);
    });
});
