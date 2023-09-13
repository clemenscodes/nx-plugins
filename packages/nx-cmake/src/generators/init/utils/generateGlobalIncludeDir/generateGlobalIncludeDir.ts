import { type Tree, generateFiles } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { join } from 'path';

export const generateGlobalIncludeDir = (
    tree: Tree,
    options: InitGeneratorSchema
) => {
    generateFiles(
        tree,
        join(__dirname, '../../', 'template', 'include'),
        'include',
        options
    );
};