import type { Tree } from '@nx/devkit';
import type { BinGeneratorSchema } from './schema';
import { resolveBinOptions } from './utils/resolveBinOptions/resolveBinOptions';
import { generateBinFiles } from './utils/generateBinFiles/generateBinFiles';
import { addBinProject } from './utils/addBinProject/addBinProject';
import libGenerator from '../library/generator';
import linkGenerator from '../link/generator';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveBinOptions(options);
    const { linkOptions } = resolvedOptions;
    addBinProject(tree, resolvedOptions);
    generateBinFiles(tree, resolvedOptions);
    await libGenerator(tree, resolvedOptions);
    await linkGenerator(tree, linkOptions);
}

export default binGenerator;
