import type { InitGeneratorSchema } from './schema';
import { type Tree, formatFiles, readNxJson, updateNxJson } from '@nx/devkit';
import { getUpdatedNxJson } from './utils/getUpdatedNxJson';
import { generateCmakeConfigFiles } from './utils/generateCmakeConfigFiles';
import { generateGlobalIncludeDir } from './utils/generateGlobalIncludeDir';
import { generateRootConfig } from './utils/generateRootConfig';
import { generateClangFormatPreset } from './utils/generateClangFormatPreset';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
    const { skipFormat } = options;
    const nxJson = readNxJson(tree);
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(nxJson, options);

    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateGlobalIncludeDir(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);

    if (options.addClangFormatPreset) {
        generateClangFormatPreset(tree, updatedOptions);
    }

    if (!skipFormat) {
        await formatFiles(tree);
    }
}
