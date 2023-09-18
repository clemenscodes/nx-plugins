import type { NxJsonConfiguration } from '@nx/devkit';
import { addCmakeNamedInput } from './addCmakeNamedInput';

describe('addCmakeNamedInput', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {};
        expectedNxJson = {
            namedInputs: {
                cmake: [
                    '{projectRoot}/**/*.cpp',
                    '{projectRoot}/**/*.hpp',
                    '{projectRoot}/**/*.c',
                    '{projectRoot}/**/*.h',
                    '{projectRoot}/CMakeLists.txt',
                    '{workspaceRoot}/CMakeLists.txt',
                    '{workspaceRoot}/cmake/**/*.cmake',
                ],
            },
        };
    });

    it('should add cmakeNamedInput when namedInputs is missing', () => {
        const result = addCmakeNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add cmakeNamedInput when namedInputs.cmake is missing', () => {
        updatedNxJson = {
            namedInputs: {},
        };

        const result = addCmakeNamedInput(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify namedInputs if cmakeNamedInput is already present', () => {
        updatedNxJson = {
            namedInputs: {
                cmake: ['custom-pattern/**/*.cpp'],
            },
        };
        const result = addCmakeNamedInput(updatedNxJson);
        expect(result).toEqual(updatedNxJson);
    });
});
