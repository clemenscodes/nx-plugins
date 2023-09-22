import type { NxJsonConfiguration } from '@nx/devkit';

export const addClangFormatNamedInput = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const clangFormatNamedInput = [
        '{projectRoot}/.clang-format',
        '{projectRoot}/.clang-format.yml',
        '{projectRoot}/.clang-format.yaml',
        '{workspaceRoot}/.clang-format',
        '{workspaceRoot}/.clang-format.yml',
        '{workspaceRoot}/.clang-format.yaml',
    ];

    if (!updatedNxJson.namedInputs) {
        updatedNxJson.namedInputs = {
            clangFormat: clangFormatNamedInput,
        };
    }

    if (!('clangFormat' in updatedNxJson.namedInputs)) {
        updatedNxJson.namedInputs.clangFormat = clangFormatNamedInput;
    }

    return updatedNxJson;
};
