import { addCmakePlugin } from './addCmakePlugin';
import { PLUGIN_NAME } from '../../../../config/pluginName';

describe('addCmakePlugin', () => {
    it('should add PLUGIN_NAME to plugins when plugins is missing', () => {
        const updatedNxJson = {};
        const expectedNxJson = {
            plugins: [PLUGIN_NAME],
        };

        const result = addCmakePlugin(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add PLUGIN_NAME to plugins when PLUGIN_NAME is not included', () => {
        const updatedNxJson = {
            plugins: ['other-plugin'],
        };
        const expectedNxJson = {
            plugins: ['other-plugin', PLUGIN_NAME],
        };

        const result = addCmakePlugin(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify plugins if PLUGIN_NAME is already included', () => {
        const updatedNxJson = {
            plugins: [PLUGIN_NAME, 'other-plugin'],
        };

        const result = addCmakePlugin(updatedNxJson);

        expect(result).toEqual(updatedNxJson);
    });
});
