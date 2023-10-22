import { CProjectType } from '@/types';
import { output } from '@nx/devkit';

export const getProjectTypeFromConfigFileContent = (
    content: string,
): CProjectType => {
    if (content.includes('set(PROJECT_TYPE TEST)')) {
        return CProjectType.Test;
    }
    if (content.includes('set(PROJECT_TYPE LIB)')) {
        return CProjectType.Lib;
    }
    if (content.includes('set(PROJECT_TYPE BIN)')) {
        return CProjectType.App;
    }
    output.error({
        title: 'Failed to determine project type from CMakeLists.txt',
        bodyLines: [
            'Please make sure to have set(PROJECT_TYPE <TEST|LIB|BIN>)',
        ],
    });
    throw new Error();
};
