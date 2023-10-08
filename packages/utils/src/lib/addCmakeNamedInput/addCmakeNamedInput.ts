import type { NxJsonConfiguration } from '@nx/devkit';

export const addCmakeNamedInput = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const cmakeNamedInput = [
        '{projectRoot}/**/*.cpp',
        '{projectRoot}/**/*.hpp',
        '{projectRoot}/**/*.c',
        '{projectRoot}/**/*.h',
        '{projectRoot}/CMakeLists.txt',
        '{workspaceRoot}/CMakeLists.txt',
        '{workspaceRoot}/cmake/**/*.cmake',
    ];

    if (!updatedNxJson.namedInputs) {
        updatedNxJson.namedInputs = {
            cmake: cmakeNamedInput,
        };
    }

    if (!('cmake' in updatedNxJson.namedInputs)) {
        updatedNxJson.namedInputs['cmake'] = cmakeNamedInput;
    }

    return updatedNxJson;
};
