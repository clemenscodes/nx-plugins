import { CTag } from '../../../models/types';

export const hasValidExtension = (file: string, tag: CTag): boolean => {
    if (tag === 'c') {
        return file.endsWith('.h') || file.endsWith('.c');
    } else if (tag === 'cpp') {
        return file.endsWith('.h') || file.endsWith('.cpp');
    }
    return false;
};

export const generateExternalDependentFiles = (
    file: string,
    tag: CTag
): string[] => {
    const externalDependentFiles: string[] = [file];

    if (file.endsWith('.h')) {
        const name = file.replace('include', 'src').replace('.h', '');
        if (tag === 'c') {
            externalDependentFiles.push(name + '.c');
        } else if (tag === 'cpp') {
            externalDependentFiles.push(name + '.cpp');
        }
    }

    return externalDependentFiles;
};

export const getExternalFiles = (
    files: string[],
    root: string,
    tag: CTag
): string[] => {
    return files.flatMap((file) => {
        if (file.startsWith('include') || file.startsWith('dist')) {
            return [file];
        }

        if (!hasValidExtension(file, tag)) {
            return [];
        }

        return generateExternalDependentFiles(file, tag);
    });
};
