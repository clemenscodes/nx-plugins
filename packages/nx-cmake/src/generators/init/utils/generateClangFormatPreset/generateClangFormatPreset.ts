import { type Tree, generateFiles } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { join } from 'path';

export const generateClangFormatPreset = (
    tree: Tree,
    options: InitGeneratorSchema
) => {
    const { addClangFormatPreset } = options;
    if (!addClangFormatPreset) {
        return;
    }
    generateFiles(
        tree,
        join(__dirname, '../../', 'template', 'style'),
        '.',
        options
    );
};
