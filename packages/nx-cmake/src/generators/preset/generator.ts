import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '../init/schema';
import initGenerator from '../init/generator';

export async function presetGenerator(tree: Tree) {
    const initOptions: InitGeneratorSchema = {
        appsDir: 'bin',
        libsDir: 'libs',
        cmakeConfigDir: 'cmake',
        addClangPreset: true,
    };
    await initGenerator(tree, initOptions);
}

export default presetGenerator;
