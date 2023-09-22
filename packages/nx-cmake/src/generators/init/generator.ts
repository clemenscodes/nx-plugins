import type { InitGeneratorSchema } from './schema';
import type { Tree } from '@nx/devkit';
import { getUpdatedNxJson } from './utils/getUpdatedNxJson/getUpdatedNxJson';
import { generateCmakeConfigFiles } from './utils/generateCmakeConfigFiles/generateCmakeConfigFiles';
import { generateRootConfig } from './utils/generateRootConfig/generateRootConfig';
import { generateClangPreset } from './utils/generateClangPreset/generateClangPreset';
import { generateGlobalIncludeDir } from './utils/generateGlobalIncludeDir/generateGlobalIncludeDir';
import { checkNxVersion } from '../../utils/generatorUtils/checkNxVersion/checkNxVersion';
import { checkOs } from '../../utils/generatorUtils/checkOs/checkOs';
import { getRequiredVersionOfNx } from '../../utils/generatorUtils/getRequiredVersionOfNx/getRequiredVersionOfNx';
import { readNxJson, updateNxJson, NX_VERSION, output } from '@nx/devkit';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
    if (!checkOs(process.platform)) {
        output.error({
            title: `Unsupported platform: Windows`,
            bodyLines: [`Currently this plugin does not support windows.`],
        });
        throw new Error('Windows is not supported');
    }
    if (!checkNxVersion(NX_VERSION)) {
        output.warn({
            title: `Unsupported version of Nx`,
            bodyLines: [
                `Currently installed version of Nx: ${NX_VERSION}`,
                `Required version of Nx: ${getRequiredVersionOfNx()}`,
                `Using an outdated version of Nx might work but is unsupported.`,
            ],
        });
    }
    const nxJson = readNxJson(tree);
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(nxJson, options);
    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateGlobalIncludeDir(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);
    generateClangPreset(tree, updatedOptions);
}

export default initGenerator;
