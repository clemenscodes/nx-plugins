import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { InitGeneratorSchema } from '../../config';

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
