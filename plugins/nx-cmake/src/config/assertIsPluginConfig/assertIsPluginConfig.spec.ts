import type { NxCmakePluginConfig } from '../settings';
import { assertIsPluginConfig } from './assertIsPluginConfig';

describe('assertIsPluginConfig', () => {
    let validConfig: NxCmakePluginConfig;

    beforeEach(() => {
        validConfig = {
            language: 'C',
            cmakeConfigDir: '.cmake',
            workspaceName: 'workspace',
        };
    });

    it('should not throw an error for a valid config', () => {
        expect(() => assertIsPluginConfig(validConfig)).not.toThrow();
    });

    it('should throw an error for an invalid config', () => {
        const invalidConfig = {};
        expect(() => assertIsPluginConfig(invalidConfig)).toThrow();
    });
    it('should throw an error if data is null', () => {
        expect(() => assertIsPluginConfig(null)).toThrow(
            'Failed to read data from pluginConfig',
        );
    });

    it('should throw an error if data is not an object', () => {
        expect(() => assertIsPluginConfig('not an object')).toThrow(
            'Data of pluginConfig is not an object',
        );
    });

    it('should throw an error if language field is missing', () => {
        const configWithoutLanguage = {
            cmakeConfigDir: '.cmake',
        };
        expect(() => assertIsPluginConfig(configWithoutLanguage)).toThrow(
            'Could not read language of plugin configuration',
        );
    });

    it('should throw an error if cmakeConfigDir field is missing', () => {
        const configWithoutCmakeConfigDir = {
            language: 'C',
        };
        expect(() => assertIsPluginConfig(configWithoutCmakeConfigDir)).toThrow(
            'Could not read cmakeConfigDir of plugin configuration',
        );
    });
});
