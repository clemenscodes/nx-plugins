import type { ProjectConfiguration } from '@nx/devkit';
import { PLUGIN_NAME } from '../../../config/pluginName';
import { CProjectType } from '../../../models/types';

export const defaultConfiguration = {
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

export const cmakeTarget = {
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
};

export const executeTarget = {
    executor: `${PLUGIN_NAME}:execute`,
    ...defaultConfiguration,
};

export const debugTarget = {
    executor: `${PLUGIN_NAME}:debug`,
    ...defaultConfiguration,
};

export const testTarget = {
    executor: `${PLUGIN_NAME}:test`,
    ...defaultConfiguration,
};

export const buildTarget = {
    executor: `${PLUGIN_NAME}:build`,
    ...defaultConfiguration,
};

export const lintTarget = {
    executor: `${PLUGIN_NAME}:lint`,
    ...defaultConfiguration,
};

export const fmtTarget = {
    executor: `${PLUGIN_NAME}:format`,
    defaultConfiguration: 'development',
    configurations: {
        development: {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        },
        production: {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        },
    },
};

export const defaultTargets = {
    cmake: cmakeTarget,
    build: buildTarget,
    lint: lintTarget,
    fmt: fmtTarget,
};

export const appTargets = {
    ...defaultTargets,
    debug: debugTarget,
    execute: executeTarget,
};

export const testTargets = {
    ...defaultTargets,
    test: testTarget,
};

export const getProjectTargets = (
    projectType: CProjectType,
): ProjectConfiguration['targets'] => {
    const targets: ProjectConfiguration['targets'] = {
        ...defaultTargets,
        ...(projectType === CProjectType.Test ? { test: testTarget } : {}),
        ...(projectType === CProjectType.App ? { debug: debugTarget } : {}),
        ...(projectType === CProjectType.App ? { execute: executeTarget } : {}),
    };
    return targets;
};
