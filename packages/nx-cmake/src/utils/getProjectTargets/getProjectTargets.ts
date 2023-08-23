import type { ProjectConfiguration } from '@nx/devkit';
import { PLUGIN_NAME } from '../../config/pluginName';
import { CProjectType } from '../../models/types';

export const getProjectTargets = (
    projectType: CProjectType
): ProjectConfiguration['targets'] => {
    const defaultConfiguration = {
        defaultConfiguration: 'development',
        configurations: {
            development: {
                args: [],
            },
            production: {
                args: [],
            },
        },
    };
    const execute = {
        executor: `${PLUGIN_NAME}:execute`,
        ...defaultConfiguration,
    };
    const debug = {
        executor: `${PLUGIN_NAME}:debug`,
        ...defaultConfiguration,
    };
    const test = {
        executor: `${PLUGIN_NAME}:test`,
        ...defaultConfiguration,
    };
    const targets: ProjectConfiguration['targets'] = {
        cmake: {
            executor: `${PLUGIN_NAME}:cmake`,
            defaultConfiguration: 'development',
            configurations: {
                development: {
                    release: false,
                    args: [],
                },
                production: {
                    release: true,
                    args: [],
                },
            },
        },
        build: {
            executor: `${PLUGIN_NAME}:build`,
            ...defaultConfiguration,
        },
        lint: {
            executor: `${PLUGIN_NAME}:lint`,
            ...defaultConfiguration,
        },
        fmt: {
            executor: `${PLUGIN_NAME}:format`,
            ...defaultConfiguration,
        },
        ...(projectType === CProjectType.Test ? { test } : {}),
        ...(projectType === CProjectType.App ? { debug } : {}),
        ...(projectType === CProjectType.App ? { execute } : {}),
    };
    return targets;
};
