import { getWorkspaceLayout } from './getWorkspaceLayout';
import * as getNxJsonConfigurationModule from '../getNxJsonConfiguration/getNxJsonConfiguration';
import * as workspaceLayoutModule from '@nx/devkit'; // Import the workspaceLayout function
import type { NxJsonConfiguration } from '@nx/devkit';

describe('getWorkspaceLayout', () => {
    let getNxJsonConfigurationSpy: jest.SpyInstance<
        NxJsonConfiguration<'*' | string[]>,
        [],
        unknown
    >;

    beforeEach(() => {
        getNxJsonConfigurationSpy = jest.spyOn(
            getNxJsonConfigurationModule,
            'getNxJsonConfiguration'
        );
    });

    afterEach(() => {
        getNxJsonConfigurationSpy.mockRestore();
    });

    it('should return the workspace layout from nxJson', () => {
        const mockNxJson: NxJsonConfiguration = {
            workspaceLayout: {
                appsDir: 'apps',
                libsDir: 'libs',
                projectNameAndRootFormat: 'as-provided',
            },
        };
        getNxJsonConfigurationSpy.mockReturnValue(mockNxJson);

        const workspaceLayoutSpy = jest.spyOn(
            workspaceLayoutModule,
            'workspaceLayout'
        );
        workspaceLayoutSpy.mockReturnValue({
            appsDir: 'apps',
            libsDir: 'libs',
        });

        const result = getWorkspaceLayout();

        expect(getNxJsonConfigurationSpy).toHaveBeenCalledTimes(1);
        expect(workspaceLayoutSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockNxJson.workspaceLayout);

        workspaceLayoutSpy.mockRestore();
    });

    it('should use default layout values if nxJson does not define them', () => {
        getNxJsonConfigurationSpy.mockReturnValue({});

        const workspaceLayoutSpy = jest.spyOn(
            workspaceLayoutModule,
            'workspaceLayout'
        );
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
            projectNameAndRootFormat: 'as-provided',
        });

        workspaceLayoutSpy.mockRestore();
    });
});
