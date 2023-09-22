import type { WorkspaceLayout } from './../../../../models/types';
import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { setWorkspaceLayout } from './setWorkspaceLayout';

describe('setWorkspaceLayout', () => {
    let nxJson: NxJsonConfiguration;
    let updatedNxJson: NxJsonConfiguration;
    let baseOptions: Partial<InitGeneratorSchema>;
    let workspaceLayoutOptions: Required<WorkspaceLayout>;
    let options: InitGeneratorSchema;

    beforeEach(() => {
        nxJson = {};
        updatedNxJson = {};
        baseOptions = {
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
        };

        workspaceLayoutOptions = {
            appsDir: 'apps',
            libsDir: 'libs',
            projectNameAndRootFormat: 'derived',
        };

        options = {
            ...baseOptions,
            ...workspaceLayoutOptions,
        } as InitGeneratorSchema;
    });

    it('should set workspaceLayout when it does not exist in nxJson', () => {
        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options,
        );

        expect(resultNxJson.workspaceLayout).toEqual(workspaceLayoutOptions);
        expect(resultOptions).toEqual(options);
    });

    it('should set appsDir when it does not exist in nxJson', () => {
        nxJson = {
            workspaceLayout: {
                appsDir: '',
                libsDir: 'libs',
                projectNameAndRootFormat: 'derived',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options,
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir,
        );
        expect(resultOptions).toEqual(options);
    });

    it('should set libsDir when it does not exist in nxJson', () => {
        nxJson = {
            workspaceLayout: {
                appsDir: 'apps',
                libsDir: '',
                projectNameAndRootFormat: 'derived',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options,
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir,
        );
        expect(resultOptions).toEqual(options);
    });

    it('should set projectNameAndRootFormat when it does not exist in nxJson', () => {
        nxJson = {
            workspaceLayout: {
                appsDir: '',
                libsDir: '',
                projectNameAndRootFormat: '' as 'as-provided',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options,
        );

        expect(resultNxJson.workspaceLayout.appsDir).toEqual(
            workspaceLayoutOptions.appsDir,
        );
        expect(resultOptions).toEqual(options);
    });

    it('should override options when it they exist in nxJson', () => {
        nxJson = {
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'packages',
                projectNameAndRootFormat: 'as-provided',
            },
        };

        const [resultNxJson, resultOptions] = setWorkspaceLayout(
            nxJson,
            updatedNxJson,
            options,
        );

        expect(resultNxJson.workspaceLayout).toEqual(nxJson.workspaceLayout);
        expect(resultOptions.appsDir).toEqual(nxJson.workspaceLayout.appsDir);
        expect(resultOptions.libsDir).toEqual(nxJson.workspaceLayout.libsDir);
        expect(resultOptions.projectNameAndRootFormat).toEqual(
            nxJson.workspaceLayout.projectNameAndRootFormat,
        );
    });
});
