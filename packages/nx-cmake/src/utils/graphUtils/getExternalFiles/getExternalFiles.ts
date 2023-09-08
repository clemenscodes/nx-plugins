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
        if (f.startsWith('dist') || f.startsWith('include')) {
            return [f];
        }
        const [n] = f.endsWith('.h')
            ? f.split('.h')
            : f.endsWith('.c')
            ? f.split('.c')
            : f.endsWith('.cpp')
            ? f.split('.cpp')
            : f;
        const name = n.replace('include', 'src');
        const externalDependentFiles = [
            f,
            tag === 'c' ? name + '.c' : name + '.cpp',
        ];
        return externalDependentFiles;
    });
};
