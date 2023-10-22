import type { NxJsonConfiguration } from '@nx/devkit';
import { addClangTidyNamedInput } from './addClangTidyNamedInput';

describe('addClangTidyNamedInput', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {};
        expectedNxJson = {
            namedInputs: {
                clangTidy: [
                    '{projectRoot}/.clang-tidy',
                    '{projectRoot}/.clang-tidy.yml',
                    '{projectRoot}/.clang-tidy.yaml',
                    '{workspaceRoot}/.clang-tidy',
                    '{workspaceRoot}/.clang-tidy.yml',
                    '{workspaceRoot}/.clang-tidy.yaml',
                ],
            },
        };
    });

    it('should add cmakeNamedInput when namedInputs is missing', () => {
        const result = addClangTidyNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add cmakeNamedInput when namedInputs.cmake is missing', () => {
        updatedNxJson = {
            namedInputs: {},
        };

        const result = addClangTidyNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify namedInputs if cmakeNamedInput is already present', () => {
        updatedNxJson = {
            namedInputs: {
                clangTidy: [
                    '{projectRoot}/.clang-tidy',
                    '{projectRoot}/.clang-tidy.yml',
                    '{projectRoot}/.clang-tidy.yaml',
                    '{workspaceRoot}/.clang-tidy',
                    '{workspaceRoot}/.clang-tidy.yml',
                    '{workspaceRoot}/.clang-tidy.yaml',
                ],
            },
        };
        const result = addClangTidyNamedInput(updatedNxJson);
        expect(result).toEqual(updatedNxJson);
    });
});
