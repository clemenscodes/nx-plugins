import type { WorkspaceLayout } from './../../../../models/types';
import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { setWorkspaceLayout } from './setWorkspaceLayout';

describe('setWorkspaceLayout', () => {
    const baseOptions = {
        cmakeConfigDir: 'cmake',
        addClangFormatPreset: false,
        skipFormat: false,
    };

    const updatedNxJson: NxJsonConfiguration = {};

    const workspaceLayoutOptions: Required<WorkspaceLayout> = {
        appsDir: 'apps',
        libsDir: 'libs',
        projectNameAndRootFormat: 'derived',
    };

    const options: InitGeneratorSchema = {
        ...baseOptions,
        ...workspaceLayoutOptions,
    };

    it('should set workspaceLayout when it does not exist in nxJson', () => {
        const nxJson: NxJsonConfiguration = {};
        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options
        );

        expect(resultNxJson.workspaceLayout).toEqual(workspaceLayoutOptions);
        expect(resultOptions).toEqual(options);
    });

    it('should set appsDir when it does not exist in nxJson', () => {
        const nxJson: NxJsonConfiguration = {
            workspaceLayout: {
                appsDir: '',
                libsDir: 'libs',
                projectNameAndRootFormat: 'derived',
            },
        };
        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir
        );
        expect(resultOptions).toEqual(options);
    });

    it('should set libsDir when it does not exist in nxJson', () => {
        const nxJson: NxJsonConfiguration = {
            workspaceLayout: {
                appsDir: 'apps',
                libsDir: '',
                projectNameAndRootFormat: 'derived',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir
        );
        expect(resultOptions).toEqual(options);
    });

    it('should set projectNameAndRootFormat when it does not exist in nxJson', () => {
        const nxJson: NxJsonConfiguration = {
            workspaceLayout: {
                appsDir: '',
                libsDir: '',
                projectNameAndRootFormat: '' as 'as-provided',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir
        );
        expect(resultOptions).toEqual(options);
    });

    it('should override options when it they exist in nxJson', () => {
        const nxJson: NxJsonConfiguration = {
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'packages',
                projectNameAndRootFormat: 'as-provided',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options
        );

        expect(resultNxJson.workspaceLayout).toEqual(nxJson.workspaceLayout);
        expect(resultOptions.appsDir).toEqual(nxJson.workspaceLayout.appsDir);
        expect(resultOptions.libsDir).toEqual(nxJson.workspaceLayout.libsDir);
        expect(resultOptions.projectNameAndRootFormat).toEqual(
            nxJson.workspaceLayout.projectNameAndRootFormat
        );
    });
});
