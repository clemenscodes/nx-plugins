import type { Tree } from '@nx/devkit';
import { generateReadMe } from '../../utils/generateReadMe/generateReadMe';
import {
    addDependenciesToPackageJson,
    installPackagesTask,
    runTasksInSerial,
} from '@nx/devkit';
import initGenerator from '../init/initGenerator';
import { PLUGIN_NAME } from '../../config';
import { getDefaultInitGeneratorOptions } from '../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';

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

export default presetGenerator;
