import type {
    InitGeneratorSchema,
    NxCmakeGeneratorConfig,
    PluginGeneratorConfig,
} from '@/config';
import type { NxJsonConfiguration } from '@nx/devkit';
import { PLUGIN_NAME, getDefaultInitGeneratorOptions } from '@/config';
import { writeGeneratorConfig } from './writeGeneratorConfig';

describe('writeGeneratorConfig', () => {
    let nxJson: NxJsonConfiguration;
    let updatedNxJson: NxJsonConfiguration;
    let options: InitGeneratorSchema;
    let generatorConfig: NxCmakeGeneratorConfig;
    let expectedGeneratorConfig: PluginGeneratorConfig;

    beforeEach(() => {
        nxJson = {};
        updatedNxJson = {};
        options = getDefaultInitGeneratorOptions();
        generatorConfig = {
            binary: {
                language: options.language,
                generateTests: true,
            },
            library: {
                language: options.language,
                generateTests: true,
            },
        };
        expectedGeneratorConfig = {
            'nx-cmake': generatorConfig,
        };
    });

    it('should set generator config when it does not exist in nxJson', () => {
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });

    it('should set generator config when it exists in nxJson but is empty', () => {
        nxJson = {
            generators: {},
        };
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });

    it('should add generator config when it some other plugin config exists in nxJson', () => {
        nxJson = {
            generators: {
                somePlugin: {
                    someConfig: 'whatever',
                },
            },
        };
        if (!nxJson.generators) {
            nxJson.generators = {};
        }
        expectedGeneratorConfig['somePlugin'] = nxJson.generators['somePlugin'];
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });

    it('should update generator config when it exists but is incomplete', () => {
        nxJson = {
            generators: {
                [PLUGIN_NAME]: {},
            },
        };
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });

    it('should update generator config when it exists but is misses binary', () => {
        nxJson = {
            generators: {
                [PLUGIN_NAME]: {
                    library: {
                        language: options.language,
                    },
                },
            },
        };
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });

    it('should update plugin config when it exists but is misses library', () => {
        nxJson = {
            generators: {
                [PLUGIN_NAME]: {
                    binary: {
                        language: options.language,
                    },
                },
            },
        };
        const resultNxJson = writeGeneratorConfig(
            nxJson,
            updatedNxJson,
            options,
        );
        expect(resultNxJson.generators).toEqual(expectedGeneratorConfig);
    });
});
