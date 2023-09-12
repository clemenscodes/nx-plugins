import { type Tree, formatFiles } from '@nx/devkit';
import { linkLibrary } from '../link/utils/linkLibrary/linkLibrary';
import { resolveBinOptions } from './utils/resolveBinOptions/resolveBinOptions';
import { generateBinFiles } from './utils/generateBinFiles/generateBinFiles';
import { addBinProject } from './utils/addBinProject/addBinProject';
import libGenerator from '../library/generator';
import type { BinGeneratorSchema } from './schema';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveBinOptions(options);
    const { name, skipFormat } = resolvedOptions;
    addBinProject(tree, resolvedOptions);
    generateBinFiles(tree, resolvedOptions);
    await libGenerator(tree, resolvedOptions);
    linkLibrary(tree, name, 'shared', `lib${name}`);
    skipFormat || (await formatFiles(tree));
}

export default binGenerator;
