import type { NxJsonConfiguration } from '@nx/devkit';
import { addCmakePlugin } from './addCmakePlugin';
import { PLUGIN_NAME } from '@/config';

describe('addCmakePlugin', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {};
        expectedNxJson = {
            plugins: [PLUGIN_NAME],
        };
    });

    it('should add PLUGIN_NAME to plugins when plugins is missing', () => {
        const result = addCmakePlugin(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add PLUGIN_NAME to plugins when PLUGIN_NAME is not included', () => {
        updatedNxJson = {
            plugins: ['other-plugin'],
        };
        expectedNxJson = {
            plugins: ['other-plugin', PLUGIN_NAME],
        };
        const result = addCmakePlugin(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify plugins if PLUGIN_NAME is already included', () => {
        updatedNxJson = {
            plugins: [PLUGIN_NAME, 'other-plugin'],
        };
        const result = addCmakePlugin(updatedNxJson);
        expect(result).toEqual(updatedNxJson);
    });
});
