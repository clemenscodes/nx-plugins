import type { ProjectFileMap } from '@nx/devkit';

export const getAnySourceFile = (
    project: string,
    fileMap: ProjectFileMap
): string => {
    const { file } = fileMap[project].find(
        ({ file }) =>
            file.endsWith('.h') ||
            file.endsWith('.hpp') ||
            file.endsWith('.c') ||
            file.endsWith('.cpp') ||
            file.endsWith('.cc') ||
            file.endsWith('.cxx')
    );
    return file;
};
