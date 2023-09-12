import type { InitGeneratorSchema } from './schema';
import { type Tree, formatFiles, readNxJson, updateNxJson } from '@nx/devkit';
import { getUpdatedNxJson } from './utils/getUpdatedNxJson/getUpdatedNxJson';
import { generateCmakeConfigFiles } from './utils/generateCmakeConfigFiles/generateCmakeConfigFiles';
import { generateRootConfig } from './utils/generateRootConfig/generateRootConfig';
import { generateClangFormatPreset } from './utils/generateClangFormatPreset/generateClangFormatPreset';
import { generateGlobalIncludeDir } from './utils/generateGlobalIncludeDir/generateGlobalIncludeDir';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
    const { skipFormat } = options;
    const nxJson = readNxJson(tree);
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(nxJson, options);
    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateGlobalIncludeDir(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);
    generateClangFormatPreset(tree, updatedOptions);
    skipFormat || (await formatFiles(tree));
}

export default initGenerator;
