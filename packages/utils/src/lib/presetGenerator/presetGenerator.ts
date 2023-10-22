import type { Tree } from '@nx/devkit';
import { PLUGIN_NAME, getDefaultInitGeneratorOptions } from '@/config';
import { generateReadMe } from '../generateReadMe/generateReadMe';
import { initGenerator } from '../initGenerator/initGenerator';
import {
    addDependenciesToPackageJson,
    installPackagesTask,
    runTasksInSerial,
} from '@nx/devkit';

export async function presetGenerator(tree: Tree) {
    const initOptions = getDefaultInitGeneratorOptions();
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
