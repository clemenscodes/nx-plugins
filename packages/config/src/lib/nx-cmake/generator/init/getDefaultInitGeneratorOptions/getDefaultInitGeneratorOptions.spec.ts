import { InitSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from './getDefaultInitGeneratorOptions';

describe('getDefaultInitGeneratorOptions', () => {
    let expected: InitSchema;

    beforeEach(() => {
        expected = {
            language: 'C',
            cmakeConfigDir: '.cmake',
            cmakeC: 'C',
            appsDir: 'bin',
            libsDir: 'libs',
            addClangPreset: true,
            skipFormat: false,
            workspaceName: 'workspace',
            relativeCmakeConfigPath: '../',
        };
    });

    it('should get default init generator options', () => {
        const result = getDefaultInitGeneratorOptions();
        expect(result).toStrictEqual(expected);
    });
});
