import type { InitGeneratorSchema } from '@/config';
import type { Tree } from '@nx/devkit';
import {
    addDependenciesToPackageJson,
    installPackagesTask,
    runTasksInSerial,
} from '@nx/devkit';
import { PLUGIN_NAME, getDefaultInitGeneratorOptions } from '@/config';
import { generateReadMe } from '../generateReadMe/generateReadMe';
import { initGenerator } from '../initGenerator/initGenerator';

export async function presetGenerator(tree: Tree) {
    const initOptions: InitGeneratorSchema = getDefaultInitGeneratorOptions();
    await initGenerator(tree, initOptions);
    const name = `Welcome to [${PLUGIN_NAME}](https://www.npmjs.com/package/${PLUGIN_NAME})!`;
    generateReadMe(tree, name);
    runTasksInSerial(
        addDependenciesToPackageJson(tree, {}, { prettier: 'latest' }),
    );
    return async () => {
        installPackagesTask(tree);
    };
}
