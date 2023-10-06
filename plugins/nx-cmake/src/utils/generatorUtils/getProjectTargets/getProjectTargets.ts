import type { ProjectConfiguration } from '@nx/devkit';
import { PLUGIN_NAME } from '@/config';
import { CProjectType } from '@/types';

export const defaultConfiguration = {
    defaultConfiguration: 'debug',
    configurations: {
        debug: {
            release: false,
            args: [],
        },
        release: {
            release: true,
            args: [],
        },
    },
};

export const cmakeTarget = {
    executor: `${PLUGIN_NAME}:cmake`,
    ...defaultConfiguration,
};

export const buildTarget = {
    executor: `${PLUGIN_NAME}:build`,
    ...defaultConfiguration,
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

export const lintTarget = {
    executor: `${PLUGIN_NAME}:lint`,
    defaultConfiguration: 'local',
    configurations: {
        local: {
            args: [],
        },
        ci: {
            args: ['--warnings-as-errors=*'],
        },
    },
};

export const fmtTarget = {
    executor: `${PLUGIN_NAME}:format`,
    defaultConfiguration: 'local',
    configurations: {
        local: {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        },
        ci: {
            args: ['--dry-run', '--ferror-limit=0', '-Werror'],
            verbose: false,
            editFilesInPlace: false,
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
