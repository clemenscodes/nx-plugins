import type { C } from '@/types';
import { output } from '@nx/devkit';

export const getLanguageVariant = (configFileContent: string): C => {
    const projectLanguageVariantRegex = /^.*set\(LANGUAGE+\s(?:C|CXX)\).*$/gm;
    const projectMatchResult = configFileContent.match(
        projectLanguageVariantRegex,
    );
    if (!projectMatchResult) {
        output.error({
            title: 'Failed to determine C language variant from CMakeLists.txt',
            bodyLines: ['Please make sure to have set(LANGUAGE <LANGUAGE>)'],
        });
        throw new Error();
    }
    const project = projectMatchResult.pop();
    if (!project) {
        output.error({
            title: `Failed to get project name from CMakeLists.txt`,
        });
        throw new Error();
    }
    if (project.endsWith('C)')) {
        return 'C';
    }
    if (project.endsWith('CXX)')) {
        return 'C++';
    }
    output.error({
        title: 'Failed to determine C language variant from CMakeLists.txt',
    });
    throw new Error();
};
