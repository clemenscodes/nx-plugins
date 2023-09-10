import { join } from 'path';
import {
    formatFiles,
    generateFiles,
    readProjectConfiguration,
    type Tree,
} from '@nx/devkit';
import type { ModuleGeneratorSchema } from './schema';
import { getTag } from '../../utils/graphUtils/filterProjects/filterProjects';
import { getIncludeDirective } from './utils/getIncludeDirective';
import { projectIsApp } from './utils/projectIsApp';
import { resolveOptions } from '../../utils/generatorUtils/resolveOptions/resolveOptions';
import { trimLib } from '../../utils/generatorUtils/trimLib/trimLib';

export async function moduleGenerator(
    tree: Tree,
    options: ModuleGeneratorSchema
) {
    const resolvedOptions = resolveOptions(options);
    const { skipFormat, name, constantName } = resolvedOptions;
    const { root, projectType, tags } = readProjectConfiguration(tree, name);
    const dirName = trimLib(name);
    const isApp = projectIsApp(projectType);
    const include = getIncludeDirective(isApp, name, dirName);

    resolvedOptions.resolvedProject = constantName;
    resolvedOptions.include = include;
    resolvedOptions.tag = getTag(tags);

    generateFiles(tree, join(__dirname, 'template'), root, resolvedOptions);

    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default moduleGenerator;
