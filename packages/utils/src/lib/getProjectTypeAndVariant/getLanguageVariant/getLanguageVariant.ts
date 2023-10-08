import type { C } from '@/config';

export const getLanguageVariant = (configFileContent: string): C => {
    const projectLanguageVariantRegex = /^.*project\([^)]+\s(?:C|CXX)\).*$/gm;
    const projectMatchResult = configFileContent.match(
        projectLanguageVariantRegex,
    );
    if (!projectMatchResult) {
        throw new Error(
            'Failed to determine C language variant from CMakeLists.txt',
        );
    }
    const project = projectMatchResult.pop();
    if (!project) {
        throw new Error(`Failed to get project name from CMakeLists.txt`);
    }
    if (project.endsWith('C)')) {
        return 'C';
    }
    if (project.endsWith('CXX)')) {
        return 'C++';
    }
    throw new Error(
        'Failed to determine C language variant from CMakeLists.txt',
    );
};
