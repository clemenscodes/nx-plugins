import type { ProjectConfiguration } from '@nx/devkit';
import {
    CMAKE_TARGET_NAME,
    COMPILE_TARGET_NAME,
    DEBUG_TARGET_NAME,
    EXECUTE_TARGET_NAME,
    FMT_TARGET_NAME,
    LINT_TARGET_NAME,
    PLUGIN_NAME,
    TEST_TARGET_NAME,
} from '@/config';
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
    executor: `${PLUGIN_NAME}:${CMAKE_TARGET_NAME}`,
    ...defaultConfiguration,
};

export const compileTarget = {
    executor: `${PLUGIN_NAME}:${COMPILE_TARGET_NAME}`,
    ...defaultConfiguration,
};

export const executeTarget = {
    executor: `${PLUGIN_NAME}:${EXECUTE_TARGET_NAME}`,
    ...defaultConfiguration,
};

export const debugTarget = {
    executor: `${PLUGIN_NAME}:${DEBUG_TARGET_NAME}`,
    ...defaultConfiguration,
};

export const testTarget = {
    executor: `${PLUGIN_NAME}:${TEST_TARGET_NAME}`,
    ...defaultConfiguration,
};

export const lintTarget = {
    executor: `${PLUGIN_NAME}:${LINT_TARGET_NAME}`,
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
    executor: `${PLUGIN_NAME}:${FMT_TARGET_NAME}`,
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
    compile: compileTarget,
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
