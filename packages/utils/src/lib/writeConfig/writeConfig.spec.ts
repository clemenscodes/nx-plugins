import type {
    InitGeneratorSchema,
    NxCmakePluginConfig,
    NxPluginsConfig,
} from '@/config';
import type { NxJsonConfiguration } from '@nx/devkit';
import { writeConfig } from './writeConfig';
import { PLUGIN_NAME, getDefaultInitGeneratorOptions } from '@/config';

describe('writeConfig', () => {
    let nxJson: NxJsonConfiguration;
    let updatedNxJson: NxJsonConfiguration;
    let options: InitGeneratorSchema;
    let pluginConfig: NxCmakePluginConfig;
    let expectedPluginConfig: NxPluginsConfig;

    beforeEach(() => {
        nxJson = {};
        updatedNxJson = {};
        options = getDefaultInitGeneratorOptions();
        pluginConfig = {
            language: options.language,
            globalIncludeDir: options.globalIncludeDir,
            cmakeConfigDir: options.cmakeConfigDir,
            workspaceName: options.workspaceName,
        };
        expectedPluginConfig = {
            'nx-cmake': pluginConfig,
        };
    });

    it('should set plugin config when it does not exist in nxJson', () => {
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should set plugin config when it exists in nxJson but is empty', () => {
        nxJson = {
            pluginsConfig: {},
        };
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should add plugin config when it some other plugin config exists in nxJson', () => {
        nxJson = {
            pluginsConfig: {
                somePlugin: {
                    someConfig: 'whatever',
                },
            },
        };

        if (!expectedPluginConfig) {
            expectedPluginConfig = {};
        }
        if (!nxJson.pluginsConfig) {
            nxJson.pluginsConfig = {};
        }
        expectedPluginConfig['somePlugin'] = nxJson.pluginsConfig['somePlugin'];
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should update plugin config when it exists but is incomplete', () => {
        nxJson = {
            pluginsConfig: {
                [PLUGIN_NAME]: {},
            },
        };
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should update plugin config when it exists but is misses globalIncludeDir', () => {
        nxJson = {
            pluginsConfig: {
                [PLUGIN_NAME]: {
                    cmakeConfigDir: '.cmake',
                    language: 'C',
                },
            },
        };
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should update plugin config when it exists but is misses cmakeConfigDir', () => {
        nxJson = {
            pluginsConfig: {
                [PLUGIN_NAME]: {
                    globalIncludeDir: 'include',
                    language: 'C',
                },
            },
        };
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });

    it('should update plugin config when it exists but is misses language', () => {
        nxJson = {
            pluginsConfig: {
                [PLUGIN_NAME]: {
                    globalIncludeDir: 'include',
                },
            },
        };
        const resultNxJson = writeConfig(nxJson, updatedNxJson, options);
        expect(resultNxJson.pluginsConfig).toEqual(expectedPluginConfig);
    });
});
