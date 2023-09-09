import type { NxJsonConfiguration } from '@nx/devkit';

export const addTargetDefaults = (
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    const cmakeTargetDefault = {
        dependsOn: ['^cmake'],
        inputs: ['cmake'],
    };

    const buildTargetDefault = {
        dependsOn: ['^build', 'cmake'],
        inputs: ['default'],
    };

    const dependsOnBuild = ['build'];
    const defaultInput = ['default'];

    const debugTargetDefault = {
        dependsOn: dependsOnBuild,
        inputs: defaultInput,
    };

    const executeTargetDefault = {
        dependsOn: dependsOnBuild,
        inputs: defaultInput,
    };

    if (!updatedNxJson.targetDefaults) {
        updatedNxJson.targetDefaults = {
            cmake: cmakeTargetDefault,
            build: buildTargetDefault,
            debug: debugTargetDefault,
            execute: executeTargetDefault,
        };
    }

    if (!('cmake' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.cmake = cmakeTargetDefault;
    }

    if (!('build' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.build = buildTargetDefault;
    }

    if (!('debug' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.debug = debugTargetDefault;
    }

    if (!('execute' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.execute = executeTargetDefault;
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn) {
        updatedNxJson.targetDefaults.build.dependsOn = dependsOnBuild;
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('^build')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('cmake')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn) {
        updatedNxJson.targetDefaults.debug.dependsOn = dependsOnBuild;
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn.includes('build')) {
        updatedNxJson.targetDefaults.debug.dependsOn.push('build');
    }

    return updatedNxJson;
};
