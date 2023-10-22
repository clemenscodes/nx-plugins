import type { C } from '@/types';
import { getLanguageVariant } from './getLanguageVariant';
import { output } from '@nx/devkit';

describe('getLanguageVariantFromConfigFileContent', () => {
    let configFileContent: string;
    let expectedVariant: C;
    let nxErrorOutputMock: jest.SpyInstance;

    beforeEach(() => {
        configFileContent = 'set(LANGUAGE C)\n';
        expectedVariant = 'C';
        nxErrorOutputMock = jest.spyOn(output, 'error');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get C language variant', () => {
        const result = getLanguageVariant(configFileContent);
        expect(result).toStrictEqual(expectedVariant);
    });

    it('should get C++ language variant', () => {
        configFileContent = 'set(LANGUAGE CXX)\n';
        expectedVariant = 'C++';
        const result = getLanguageVariant(configFileContent);
        expect(result).toStrictEqual(expectedVariant);
    });

    it('should throw if no language variant set', () => {
        configFileContent = 'set(LANGUAGE INCORRECTLY)\n';
        nxErrorOutputMock.mockImplementation(jest.fn());
        expect(() => getLanguageVariant(configFileContent)).toThrowError();
        expect(nxErrorOutputMock).toHaveBeenCalledWith({
            title: 'Failed to determine C language variant from CMakeLists.txt',
            bodyLines: ['Please make sure to have set(LANGUAGE <LANGUAGE>)'],
        });
    });
});
