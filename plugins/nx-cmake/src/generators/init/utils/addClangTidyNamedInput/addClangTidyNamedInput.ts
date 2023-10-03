import type { NxJsonConfiguration } from '@nx/devkit';

export const addClangTidyNamedInput = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const clangTidyNamedInput = [
        '{projectRoot}/.clang-tidy',
        '{projectRoot}/.clang-tidy.yml',
        '{projectRoot}/.clang-tidy.yaml',
        '{workspaceRoot}/.clang-tidy',
        '{workspaceRoot}/.clang-tidy.yml',
        '{workspaceRoot}/.clang-tidy.yaml',
    ];

    if (!updatedNxJson.namedInputs) {
        updatedNxJson.namedInputs = {
            clangTidy: clangTidyNamedInput,
        };
    }

    if (!('clangTidy' in updatedNxJson.namedInputs)) {
        updatedNxJson.namedInputs.clangTidy = clangTidyNamedInput;
    }

    return updatedNxJson;
};
