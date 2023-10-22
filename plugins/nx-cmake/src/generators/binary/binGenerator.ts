import type { Tree } from '@nx/devkit';
import { formatFiles } from '@nx/devkit';
import libGenerator from '../library/libGenerator';
import linkGenerator from '../link/linkGenerator';
import { BinGeneratorSchema } from '../generator';
import { addBinProject } from './addBinProject/addBinProject';
import { generateBinFiles } from './generateBinFiles/generateBinFiles';
import { resolveBinOptions } from './resolveBinOptions/resolveBinOptions';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveBinOptions(options);
    const { linkOptions } = resolvedOptions;
    generateBinFiles(tree, resolvedOptions);
    addBinProject(tree, resolvedOptions);
    await libGenerator(tree, resolvedOptions);
    linkGenerator(tree, linkOptions);
    await formatFiles(tree);
}

export default binGenerator;
