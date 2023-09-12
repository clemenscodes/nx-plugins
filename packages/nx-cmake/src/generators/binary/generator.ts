import { type Tree, formatFiles } from '@nx/devkit';
import { resolveBinOptions } from './utils/resolveBinOptions/resolveBinOptions';
import { generateBinFiles } from './utils/generateBinFiles/generateBinFiles';
import { addBinProject } from './utils/addBinProject/addBinProject';
import libGenerator from '../library/generator';
import type { BinGeneratorSchema } from './schema';
import linkGenerator from '../link/generator';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveBinOptions(options);
    const { skipFormat, linkOptions } = resolvedOptions;
    addBinProject(tree, resolvedOptions);
    generateBinFiles(tree, resolvedOptions);
    await libGenerator(tree, resolvedOptions);
    await linkGenerator(tree, linkOptions);
    skipFormat || (await formatFiles(tree));
}

export default binGenerator;
