import {
    checkNxVersion,
    getRequiredVersionOfNx,
    type InitGeneratorSchema,
} from '@/config';
import type { Tree } from '@nx/devkit';
import { generateClangPreset } from '../generateClangPreset/generateClangPreset';
import { generateCmakeConfigFiles } from '../generateCmakeConfigFiles/generateCmakeConfigFiles';
import { generateGlobalIncludeDir } from '../generateGlobalIncludeDir/generateGlobalIncludeDir';
import { generateRootConfig } from '../generateRootConfig/generateRootConfig';
import { getUpdatedNxJson } from '../getUpdatedNxJson/getUpdatedNxJson';
import {
    readNxJson,
    updateNxJson,
    NX_VERSION,
    output,
    formatFiles,
} from '@nx/devkit';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
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
    if (!nxJson) {
        throw new Error(`Failed to read nx.json`);
    }
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(nxJson, options);
    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateGlobalIncludeDir(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);
    generateClangPreset(tree, updatedOptions);
    if (!options.skipFormat) {
        await formatFiles(tree);
    }
}
