import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from '@/config';
import { addLibProjectConfig } from '../addLibProjectConfig/addLibProjectConfig';
import { addTestProjectConfig } from '../addTestProjectConfig/addTestProjectConfig';
import { generateLibFiles } from '../generateLibFiles/generateLibFiles';
import { generateLibTestFiles } from '../generateLibTestFiles/generateLibTestFiles';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { formatFiles } from '@nx/devkit';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveLibOptions(options);
    generateLibFiles(tree, resolvedOptions);
    addLibProjectConfig(tree, resolvedOptions);
    generateLibTestFiles(tree, resolvedOptions);
    addTestProjectConfig(tree, resolvedOptions);
    await formatFiles(tree);
}
