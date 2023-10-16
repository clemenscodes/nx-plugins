import type { NxCmakePluginConfig } from '../settings';

export function assertIsPluginConfig(
    data: unknown,
): asserts data is NxCmakePluginConfig {
    if (!data) {
        throw new Error('Failed to read data from pluginConfig');
    }
    if (typeof data !== 'object') {
        throw new Error('Data of pluginConfig is not an object');
    }
    const assertField = (data: object, field: string) => {
        if (!(field in data)) {
            throw new Error(`Could not read ${field} of plugin configuration`);
        }
    };
    assertField(data, 'language');
    assertField(data, 'globalIncludeDir');
    assertField(data, 'cmakeConfigDir');
    assertField(data, 'workspaceName');
}
