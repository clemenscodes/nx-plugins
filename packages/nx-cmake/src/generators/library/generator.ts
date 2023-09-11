import type { LibGeneratorSchema } from './schema';
import { type Tree, formatFiles } from '@nx/devkit';
import { resolveLibOptions } from './utils/resolvedLibOptions/resolveLibOptions';
import { addTestProjectConfig } from './utils/addTestProjectConfig/addTestProjectConfig';
import { addLibProjectConfig } from './utils/addLibProjectConfig/addLibProjectConfig';
import { generateLibFiles } from './utils/generateLibFiles/generateLibFiles';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveLibOptions(options);
    const { skipFormat } = resolvedOptions;
    generateLibFiles(tree, resolvedOptions);
    addLibProjectConfig(tree, resolvedOptions);
    addTestProjectConfig(tree, resolvedOptions);
    skipFormat || (await formatFiles(tree));
}

export default libGenerator;
