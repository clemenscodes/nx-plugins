import { addCmakeNamedInput } from './addCmakeNamedInput';

describe('addCmakeNamedInput', () => {
    it('should add cmakeNamedInput when namedInputs is missing', () => {
        const updatedNxJson = {};
        const expectedNxJson = {
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

        const result = addCmakeNamedInput(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add cmakeNamedInput when namedInputs.cmake is missing', () => {
        const updatedNxJson = {
            namedInputs: {},
        };
        const expectedNxJson = {
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

        const result = addCmakeNamedInput(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify namedInputs if cmakeNamedInput is already present', () => {
        const updatedNxJson = {
            namedInputs: {
                cmake: ['custom-pattern/**/*.cpp'],
            },
        };

        const result = addCmakeNamedInput(updatedNxJson);

        expect(result).toEqual(updatedNxJson);
    });
});
