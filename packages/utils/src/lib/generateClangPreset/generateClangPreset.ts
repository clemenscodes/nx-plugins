import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/types';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateClangPreset = (
    tree: Tree,
    options: InitGeneratorSchema,
) => {
    const { addClangPreset } = options;
    if (!addClangPreset) {
        return;
    }
    generateFiles(tree, join(__dirname, 'template'), '.', options);
};
