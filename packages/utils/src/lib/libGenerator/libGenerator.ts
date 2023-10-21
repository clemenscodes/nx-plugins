import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from '@/config';
import { addLibProjectConfig } from '../addLibProjectConfig/addLibProjectConfig';
import { addTestProjectConfig } from '../addTestProjectConfig/addTestProjectConfig';
import { generateLibFiles } from '../generateLibFiles/generateLibFiles';
import { generateLibTestFiles } from '../generateLibTestFiles/generateLibTestFiles';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { formatFiles } from '@nx/devkit';
import { linkGenerator } from '../linkGenerator/linkGenerator';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveLibOptions(options);
    const { libName, generateTests, testName } = resolvedOptions;
    const linkOptions = { target: libName, source: testName };
    generateLibFiles(tree, resolvedOptions);
    addLibProjectConfig(tree, resolvedOptions);
    if (generateTests) {
        generateLibTestFiles(tree, resolvedOptions);
        addTestProjectConfig(tree, resolvedOptions);
        linkGenerator(tree, linkOptions);
    }
    await formatFiles(tree);
}
