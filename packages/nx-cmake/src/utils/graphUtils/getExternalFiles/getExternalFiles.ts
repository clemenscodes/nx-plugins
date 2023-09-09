import { CTag } from '../../../models/types';

export const getExternalFiles = (
    files: string[],
    root: string,
    tag: CTag
): string[] => {
    return files.flatMap((f) => {
        if (f.startsWith(root)) {
            return [];
        }

        if (f.startsWith('include') || f.startsWith('dist')) {
            return [f];
        }

        const isHFile = f.endsWith('.h');
        const isCFile = f.endsWith('.c');
        const isCppFile = f.endsWith('.cpp');

        if (!isHFile && !isCFile && !isCppFile) {
            return [];
        }

        const [n] = isHFile
            ? f.split('.h')
            : isCFile
            ? f.split('.c')
            : isCppFile
            ? f.split('.cpp')
            : [f];

        const name = n.replace('include', 'src');
        const externalDependentFiles = [f];

        if (isHFile) {
            // Add corresponding .c or .cpp file for .h files
            if (tag === 'c') {
                externalDependentFiles.push(name + '.c');
            } else if (tag === 'cpp') {
                externalDependentFiles.push(name + '.cpp');
            }
        }

        if (isCFile && tag === 'cpp') {
            return [];
        }

        if (isCppFile && tag === 'c') {
            return [];
        }

        return externalDependentFiles;
    });
};
