import type { NxJsonConfiguration } from '@nx/devkit';
import { PLUGIN_NAME } from '@/config';
import { getPluginConfig } from './getPluginConfig';
import * as getNxJsonConfigurationModule from '../../generatorUtils/getNxJsonConfiguration/getNxJsonConfiguration';

describe('getPluginConfig', () => {
    let mockNxJsonConfig: NxJsonConfiguration;
    let getNxJsonConfigurationSpy: jest.SpyInstance;

    beforeEach(() => {
        mockNxJsonConfig = {
            pluginsConfig: {
                [PLUGIN_NAME]: {
                    language: 'C',
                    cmakeConfigDir: 'path/to/cmakeConfigDir',
                    globalIncludeDir: 'path/to/globalIncludeDir',
                },
            },
        };
        getNxJsonConfigurationSpy = jest.spyOn(
            getNxJsonConfigurationModule,
            'getNxJsonConfiguration',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the plugin config when it exists in nx.json', () => {
        getNxJsonConfigurationSpy.mockReturnValue(mockNxJsonConfig);
        const pluginConfig = getPluginConfig();
        expect(pluginConfig).toEqual(
            mockNxJsonConfig.pluginsConfig[PLUGIN_NAME],
        );
    });

    it('should return default config if the plugin config is missing in nx.json', () => {
        mockNxJsonConfig = {
            pluginsConfig: {},
        };
        getNxJsonConfigurationSpy.mockReturnValue(mockNxJsonConfig);
        const result = getPluginConfig();
        expect(result).toEqual({
            language: 'C',
            cmakeConfigDir: '.cmake',
            globalIncludeDir: 'include',
        });
    });
});
