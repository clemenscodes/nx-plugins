import {
    addDependenciesToPackageJson,
    installPackagesTask,
    runTasksInSerial,
    type Tree,
} from '@nx/devkit';
import type { InitGeneratorSchema } from '../init/schema';
import initGenerator from '../init/generator';
import { generateReadMe } from './utils/generateReadMe/generateReadMe';
import { PLUGIN_NAME } from '../../config/pluginName';

export async function presetGenerator(tree: Tree) {
    const initOptions: InitGeneratorSchema = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        globalIncludeDir: 'include',
        appsDir: 'bin',
        libsDir: 'libs',
        addClangPreset: true,
        skipFormat: true,
    };
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
