import type { NxJsonConfiguration } from '@nx/devkit';
import { getWorkspaceLayout } from './getWorkspaceLayout';
import * as getNxJsonConfigurationModule from '@/utils/lib/getNxJsonConfiguration/getNxJsonConfiguration';
import * as workspaceLayoutModule from '@nx/devkit';

describe('getWorkspaceLayout', () => {
    let getNxJsonConfigurationSpy: jest.SpyInstance<
        NxJsonConfiguration<'*' | string[]>,
        [],
        unknown
    >;
    let workspaceLayoutSpy: jest.SpyInstance;
    let mockNxJson: NxJsonConfiguration;
    beforeEach(() => {
        getNxJsonConfigurationSpy = jest.spyOn(
            getNxJsonConfigurationModule,
            'getNxJsonConfiguration',
        );
        workspaceLayoutSpy = jest.spyOn(
            workspaceLayoutModule,
            'workspaceLayout',
        );
        mockNxJson = {
            workspaceLayout: {
                appsDir: 'apps',
                libsDir: 'libs',
            },
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the workspace layout from nxJson', () => {
        getNxJsonConfigurationSpy.mockReturnValue(mockNxJson);
        workspaceLayoutSpy.mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
        });
        const result = getWorkspaceLayout();
        expect(getNxJsonConfigurationSpy).toHaveBeenCalledTimes(1);
        expect(workspaceLayoutSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockNxJson.workspaceLayout);
    });

    it('should use default layout values if nxJson does not define them', () => {
        getNxJsonConfigurationSpy.mockReturnValue({});
        workspaceLayoutSpy.mockReturnValue({
            appsDir: 'bin',
            libsDir: 'packages',
        });
        const result = getWorkspaceLayout();
        expect(getNxJsonConfigurationSpy).toHaveBeenCalledTimes(1);
        expect(workspaceLayoutSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            appsDir: 'bin',
            libsDir: 'packages',
        });
    });
});
