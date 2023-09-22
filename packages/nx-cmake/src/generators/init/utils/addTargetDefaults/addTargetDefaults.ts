import type { NxJsonConfiguration } from '@nx/devkit';

export const addTargetDefaults = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const dependsOnBuild = ['build'];
    const defaultInput = ['default'];
    const lintInput = ['clangTidy'];
    const fmtInput = ['clangFormat'];

    const cmakeTargetDefault = {
        dependsOn: ['^cmake'],
        inputs: ['cmake'],
    };

    const fmtTargetDefault = {
        dependsOn: [],
        inputs: fmtInput,
    };

    const lintTargetDefault = {
        dependsOn: ['cmake'],
        inputs: lintInput,
    };

    const buildTargetDefault = {
        dependsOn: ['^cmake', '^build', 'cmake'],
        inputs: ['default'],
    };

    const testTargetDefault = {
        dependsOn: dependsOnBuild,
        inputs: defaultInput,
    };

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
            fmt: fmtTargetDefault,
            lint: lintTargetDefault,
            test: testTargetDefault,
            debug: debugTargetDefault,
            execute: executeTargetDefault,
        };
    }

    if (!('lint' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.lint = lintTargetDefault;
    }

    if (!('fmt' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.fmt = fmtTargetDefault;
    }

    if (!('test' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.test = testTargetDefault;
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

    if (!updatedNxJson.targetDefaults.cmake.dependsOn) {
        updatedNxJson.targetDefaults.cmake.dependsOn = ['^cmake'];
    }

    if (!updatedNxJson.targetDefaults.cmake.dependsOn.includes('^cmake')) {
        updatedNxJson.targetDefaults.cmake.dependsOn.push('^cmake');
    }

    if (!updatedNxJson.targetDefaults.cmake.inputs) {
        updatedNxJson.targetDefaults.cmake.inputs = ['cmake'];
    }

    if (!updatedNxJson.targetDefaults.cmake.inputs.includes('cmake')) {
        updatedNxJson.targetDefaults.cmake.inputs.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn) {
        updatedNxJson.targetDefaults.build.dependsOn = dependsOnBuild;
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!(updatedNxJson.targetDefaults.build.dependsOn[0] === '^cmake')) {
        updatedNxJson.targetDefaults.build.dependsOn.unshift('^cmake');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('^build')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('cmake')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('cmake')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.lint.dependsOn.includes('cmake')) {
        updatedNxJson.targetDefaults.lint.dependsOn.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.lint.inputs) {
        updatedNxJson.targetDefaults.fmt.inputs = ['clangTidy'];
    }

    if (!updatedNxJson.targetDefaults.fmt.inputs) {
        updatedNxJson.targetDefaults.fmt.inputs = ['clangFormat'];
    }

    if (!updatedNxJson.targetDefaults.test.dependsOn) {
        updatedNxJson.targetDefaults.test.dependsOn = dependsOnBuild;
    }

    if (!updatedNxJson.targetDefaults.test.dependsOn.includes('build')) {
        updatedNxJson.targetDefaults.test.dependsOn.push('build');
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn) {
        updatedNxJson.targetDefaults.debug.dependsOn = dependsOnBuild;
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn.includes('build')) {
        updatedNxJson.targetDefaults.debug.dependsOn.push('build');
    }

    return updatedNxJson;
};
