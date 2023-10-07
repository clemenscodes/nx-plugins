import type { C } from '@/config';
import { getLanguageVariant } from './getLanguageVariant';

describe('getLanguageVariantFromConfigFileContent', () => {
    let configFileContent: string;
    let expectedVariant: C;

    beforeEach(() => {
        configFileContent = 'project(testproject C)\n';
        expectedVariant = 'C';
    });

    it('should get C language variant', () => {
        const result = getLanguageVariant(configFileContent);
        expect(result).toStrictEqual(expectedVariant);
    });

    it('should get C++ language variant', () => {
        configFileContent = 'project(testproject CXX)\n';
        expectedVariant = 'C++';
        const result = getLanguageVariant(configFileContent);
        expect(result).toStrictEqual(expectedVariant);
    });

    it('should throw if no language variant set', () => {
        configFileContent = 'project(testproject whatever)\n';
        expect(() => getLanguageVariant(configFileContent)).toThrowError(
            'Failed to determine C language variant from CMakeLists.txt',
        );
    });
});
