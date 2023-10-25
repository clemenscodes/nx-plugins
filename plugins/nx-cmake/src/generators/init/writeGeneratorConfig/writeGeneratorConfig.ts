import type { NxJsonConfiguration } from '@nx/devkit';
import { InitGeneratorSchema } from '../../generator';
import { PLUGIN_NAME } from '../../../config/name';
import {
    NxCmakeGeneratorConfig,
    PluginGeneratorConfig,
} from '../../../config/settings';

export const writeGeneratorConfig = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema,
): NxJsonConfiguration => {
    const { language } = options;
    const generatorConfig: PluginGeneratorConfig = {
        [PLUGIN_NAME]: {
            binary: {
                language,
                generateTests: true,
            },
            library: {
                language,
                generateTests: true,
            },
        },
    };

    if (!nxJson.generators) {
        nxJson.generators = generatorConfig;
        updatedNxJson.generators = generatorConfig;
    }

    if (!(PLUGIN_NAME in nxJson.generators)) {
        updatedNxJson.generators = nxJson.generators;
        updatedNxJson.generators[PLUGIN_NAME] = generatorConfig[PLUGIN_NAME];
    }

    if (!updatedNxJson.generators) {
        updatedNxJson.generators = generatorConfig;
    }

    const existingGeneratorConfig = nxJson.generators[
        PLUGIN_NAME
    ] as NxCmakeGeneratorConfig;

    const updatedGeneratorConfig = updatedNxJson.generators[PLUGIN_NAME];

    if (!existingGeneratorConfig.binary) {
        existingGeneratorConfig.binary = generatorConfig[PLUGIN_NAME].binary;
        updatedGeneratorConfig['binary'] = generatorConfig[PLUGIN_NAME].binary;
    }

    if (!existingGeneratorConfig.library) {
        existingGeneratorConfig.library = generatorConfig[PLUGIN_NAME].library;
        updatedGeneratorConfig['library'] =
            generatorConfig[PLUGIN_NAME].library;
    }

    return updatedNxJson;
};
