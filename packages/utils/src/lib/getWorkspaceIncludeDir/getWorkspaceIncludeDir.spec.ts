import type { NxCmakePluginConfig } from '@/config';
import { getWorkspaceIncludeDir } from './getWorkspaceIncludeDir';
import * as getPluginConfigModule from '../getPluginConfig/getPluginConfig';

describe('getWorkspaceIncludeDir', () => {
    let pluginConfigMock: NxCmakePluginConfig;
    let getPluginConfigMock: jest.SpyInstance;

    beforeEach(() => {
        pluginConfigMock = {
            language: 'C',
            globalIncludeDir: 'include',
            cmakeConfigDir: '.cmake',
        };
        getPluginConfigMock = jest.spyOn(
            getPluginConfigModule,
            'getPluginConfig',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the workspace include directory', () => {
        getPluginConfigMock.mockReturnValueOnce(pluginConfigMock);
        const result = getWorkspaceIncludeDir();
        expect(result).toStrictEqual('include');
    });

    it('should return whatever the workspace include directory is', () => {
        pluginConfigMock.globalIncludeDir = 'whatever';
        getPluginConfigMock.mockReturnValueOnce(pluginConfigMock);
        const result = getWorkspaceIncludeDir();
        expect(result).toStrictEqual('whatever');
    });
});
