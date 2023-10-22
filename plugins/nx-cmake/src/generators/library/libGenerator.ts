import type { Tree } from '@nx/devkit';
import { formatFiles } from '@nx/devkit';
import { addLibProjectConfig } from '../../utils/addLibProjectConfig/addLibProjectConfig';
import { addTestProjectConfig } from '../../utils/addTestProjectConfig/addTestProjectConfig';
import { generateLibFiles } from '../../utils/generateLibFiles/generateLibFiles';
import { generateLibTestFiles } from '../../utils/generateLibTestFiles/generateLibTestFiles';
import { resolveLibOptions } from '../../utils/resolveLibOptions/resolveLibOptions';
import { linkGenerator } from '../link/linkGenerator';
import { LibGeneratorSchema } from '../generator';

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

export default libGenerator;
