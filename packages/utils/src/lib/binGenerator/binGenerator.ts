import type { Tree } from '@nx/devkit';
import type { BinGeneratorSchema } from '@/config';
import { formatFiles } from '@nx/devkit';
import { addBinProject } from '../addBinProject/addBinProject';
import { generateBinFiles } from '../generateBinFiles/generateBinFiles';
import { libGenerator } from '../libGenerator/libGenerator';
import { linkGenerator } from '../linkGenerator/linkGenerator';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveBinOptions(options);
    const { linkOptions } = resolvedOptions;
    generateBinFiles(tree, resolvedOptions);
    addBinProject(tree, resolvedOptions);
    await libGenerator(tree, resolvedOptions);
    linkGenerator(tree, linkOptions);
    await formatFiles(tree);
}
