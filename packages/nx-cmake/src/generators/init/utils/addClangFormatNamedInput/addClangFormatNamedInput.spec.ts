import type { NxJsonConfiguration } from '@nx/devkit';
import { addClangFormatNamedInput } from './addClangFormatNamedInput';

describe('addClangFormat', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {};
        expectedNxJson = {
            namedInputs: {
                clangFormat: [
                    '{projectRoot}/.clang-format',
                    '{projectRoot}/.clang-format.yml',
                    '{projectRoot}/.clang-format.yaml',
                    '{workspaceRoot}/.clang-format',
                    '{workspaceRoot}/.clang-format.yml',
                    '{workspaceRoot}/.clang-format.yaml',
                ],
            },
        };
    });

    it('should add clangFormatInput when namedInputs is missing', () => {
        const result = addClangFormatNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add clangFormatInput when namedInputs.cmake is missing', () => {
        updatedNxJson = {
            namedInputs: {},
        };
        const result = addClangFormatNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify namedInputs if cmakeNamedInput is already present', () => {
        updatedNxJson = {
            namedInputs: {
                clangFormat: [
                    '{projectRoot}/.clang-format',
                    '{projectRoot}/.clang-format.yml',
                    '{projectRoot}/.clang-format.yaml',
                    '{workspaceRoot}/.clang-format',
                    '{workspaceRoot}/.clang-format.yml',
                    '{workspaceRoot}/.clang-format.yaml',
                ],
            },
        };
        const result = addClangFormatNamedInput(updatedNxJson);
        expect(result).toEqual(updatedNxJson);
    });
});
