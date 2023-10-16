import { InitGeneratorSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from './getDefaultInitGeneratorOptions';

describe('getDefaultInitGeneratorOptions', () => {
    let expected: InitGeneratorSchema;

    beforeEach(() => {
        expected = {
            language: 'C',
            cmakeConfigDir: '.cmake',
            globalIncludeDir: 'include',
            appsDir: 'bin',
            libsDir: 'libs',
            addClangPreset: true,
            skipFormat: false,
            workspaceName: 'workspace',
        };
    });

    it('should get default init generator options', () => {
        const result = getDefaultInitGeneratorOptions();
        expect(result).toStrictEqual(expected);
    });
});
