import type { Tree } from '@nx/devkit';
import initGenerator from '../init/generator';
import { InitGeneratorSchema } from '../init/schema';

export async function presetGenerator(tree: Tree) {
    const initOptions: InitGeneratorSchema = {
        appsDir: 'bin',
        libsDir: 'libs',
        projectNameAndRootFormat: 'derived',
        cmakeConfigDir: 'cmake',
        addClangPreset: true,
        skipFormat: false,
    };
    await initGenerator(tree, initOptions);
}

export default presetGenerator;
