import type { Tree } from '@nx/devkit';
import {
    readNxJson,
    updateNxJson,
    NX_VERSION,
    output,
    formatFiles,
} from '@nx/devkit';
import { checkNxVersion, getRequiredVersionOfNx } from '../../config';
import { InitGeneratorSchema } from '../generator';
import { resolveInitOptions } from './resolveInitOptions/resolveInitOptions';
import { getUpdatedNxJson } from './getUpdatedNxJson/getUpdatedNxJson';
import { generateClangPreset } from './generateClangPreset/generateClangPreset';
import { generateCmakeConfigFiles } from './generateCmakeConfigFiles/generateCmakeConfigFiles';
import { generateRootConfig } from './generateRootConfig/generateRootConfig';

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
    const resolvedOptions = resolveInitOptions(options);
    const nxJson = readNxJson(tree);
    if (!nxJson) {
        throw new Error(`Failed to read nx.json`);
    }
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(
        nxJson,
        resolvedOptions,
    );
    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);
    generateClangPreset(tree, updatedOptions);
    if (!options.skipFormat) {
        await formatFiles(tree);
    }
}

export default initGenerator;
