import { CProjectType } from '@/types';
import { getProjectTypeFromConfigFileContent } from './getProjectFileFromConfigFileContent';

describe('getProjectTypeFromConfigFileContent', () => {
    it('should return Test for content with enable_testing()', () => {
        const content = 'enable_testing()';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Test,
        );
    });

    it('should return Lib for content with set_library_settings', () => {
        const content = 'set_library_settings';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Lib,
        );
    });

    it('should return App for content with set_binary_settings', () => {
        const content = 'set_binary_settings';
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.App,
        );
    });

    it('should throw an error for unknown content', () => {
        const content = 'unknown_content';
        expect(() => getProjectTypeFromConfigFileContent(content)).toThrowError(
            'Failed to determine project type',
        );
    });
});
