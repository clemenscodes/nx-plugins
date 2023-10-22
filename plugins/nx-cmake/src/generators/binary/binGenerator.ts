import type { Tree } from '@nx/devkit';
import { formatFiles } from '@nx/devkit';
import { addBinProject } from '../../utils/addBinProject/addBinProject';
import { generateBinFiles } from '../../utils/generateBinFiles/generateBinFiles';
import { resolveBinOptions } from '../../utils/resolveBinOptions/resolveBinOptions';
import libGenerator from '../library/libGenerator';
import linkGenerator from '../link/linkGenerator';
import { BinGeneratorSchema } from '../generator';

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
