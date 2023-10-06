import { CProjectType } from '@/types';

export const getProjectTypeFromConfigFileContent = (
    content: string,
): CProjectType => {
    if (content.includes('enable_testing()')) {
        return CProjectType.Test;
    }
    if (content.includes('set_library_settings')) {
        return CProjectType.Lib;
    }
    if (content.includes('set_binary_settings')) {
        return CProjectType.App;
    }
    throw new Error('Failed to determine project type');
};
