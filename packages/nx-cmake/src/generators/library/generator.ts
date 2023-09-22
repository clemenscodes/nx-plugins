import type { LibGeneratorSchema } from './schema';
import type { Tree } from '@nx/devkit';
import { resolveLibOptions } from './utils/resolveLibOptions/resolveLibOptions';
import { addTestProjectConfig } from './utils/addTestProjectConfig/addTestProjectConfig';
import { addLibProjectConfig } from './utils/addLibProjectConfig/addLibProjectConfig';
import { generateLibFiles } from './utils/generateLibFiles/generateLibFiles';
import { generateLibTestFiles } from './utils/generateLibTestFiles/generateLibTestFiles';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveLibOptions(options);
    generateLibFiles(tree, resolvedOptions);
    addLibProjectConfig(tree, resolvedOptions);
    generateLibTestFiles(tree, resolvedOptions);
    addTestProjectConfig(tree, resolvedOptions);
}

export default libGenerator;
