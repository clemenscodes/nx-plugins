import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/types';
import {
    CMAKE_TARGET_NAME,
    COMPILE_TARGET_NAME,
    EXECUTE_TARGET_NAME,
    DEBUG_TARGET_NAME,
    TEST_TARGET_NAME,
    LINT_TARGET_NAME,
    FMT_TARGET_NAME,
} from '../../config';

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
    ...defaultConfiguration,
};

export const compileTarget = {
    ...defaultConfiguration,
};

export const executeTarget = {
    ...defaultConfiguration,
};

export const debugTarget = {
    ...defaultConfiguration,
};

export const testTarget = {
    ...defaultConfiguration,
};

export const lintTarget = {
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
    [CMAKE_TARGET_NAME]: cmakeTarget,
    [COMPILE_TARGET_NAME]: compileTarget,
    [LINT_TARGET_NAME]: lintTarget,
    [FMT_TARGET_NAME]: fmtTarget,
};

export const appTargets = {
    ...defaultTargets,
    [DEBUG_TARGET_NAME]: debugTarget,
    [EXECUTE_TARGET_NAME]: executeTarget,
};

export const testTargets = {
    ...defaultTargets,
    [TEST_TARGET_NAME]: testTarget,
};

export const getProjectTargets = (
    projectType: CProjectType,
): ProjectConfiguration['targets'] => {
    const targets: ProjectConfiguration['targets'] = {
        ...defaultTargets,
        ...(projectType === CProjectType.Test
            ? { [TEST_TARGET_NAME]: testTarget }
            : {}),
        ...(projectType === CProjectType.App
            ? { [DEBUG_TARGET_NAME]: debugTarget }
            : {}),
        ...(projectType === CProjectType.App
            ? { [EXECUTE_TARGET_NAME]: executeTarget }
            : {}),
    };
    return targets;
};
