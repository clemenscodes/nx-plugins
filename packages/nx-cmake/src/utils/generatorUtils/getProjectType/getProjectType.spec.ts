import { CProjectType } from '../../../models/types';
import {
    getProjectTypeFromConfigFileContent,
    readProjectFile,
    getProjectType,
} from './getProjectType';
import * as fs from 'fs';

describe('getProjectTypeFromConfigFileContent', () => {
    let readFileSyncMock: jest.SpyInstance;

    beforeEach(() => {
        readFileSyncMock = jest.spyOn(fs, 'readFileSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return Test for content with enable_testing()', () => {
        const content = 'enable_testing()';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Test
        );
    });

    it('should return Lib for content with set_library_settings', () => {
        const content = 'set_library_settings';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Lib
        );
    });

    it('should return App for content with set_binary_settings', () => {
        const content = 'set_binary_settings';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.App
        );
    });

    it('should throw an error for unknown content', () => {
        const content = 'unknown_content';
        expect(() => getProjectTypeFromConfigFileContent(content)).toThrowError(
            'Failed to determine project type'
        );
    });

    describe('readProjectFile', () => {
        it('should read and return file content', () => {
            const projectFile = 'some-directory/CMakeLists.txt';
            const fileContent = 'This is the file content';
            readFileSyncMock.mockReturnValue(fileContent);
            expect(readProjectFile(projectFile)).toBe(fileContent);
        });

        it('should throw an error for an invalid project file', () => {
            const projectFile = 'invalid_project_file.txt';

            expect(() => readProjectFile(projectFile)).toThrowError(
                'Invalid project file'
            );
        });

        describe('getProjectType', () => {
            it('should return the project type for a valid project configuration file', () => {
                const projectConfigurationFile =
                    'some-directory/CMakeLists.txt';
                const configFileContent = 'enable_testing()';
                readFileSyncMock.mockReturnValue(configFileContent);

                expect(getProjectType(projectConfigurationFile)).toBe(
                    CProjectType.Test
                );
            });

            it('should throw an error for an invalid project configuration file', () => {
                const projectConfigurationFile = 'invalid_project_config.txt';

                expect(() =>
                    getProjectType(projectConfigurationFile)
                ).toThrowError(
                    `Failed to determine project type for the configuration file ${projectConfigurationFile}`
                );
            });
        });
    });
});
