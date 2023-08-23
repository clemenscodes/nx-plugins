import { join } from 'path';
import {
    formatFiles,
    generateFiles,
    names,
    readProjectConfiguration,
    type Tree,
} from '@nx/devkit';
import type { ModuleGeneratorSchema } from './schema';
import { resolveOptions } from '../../utils/resolveOptions/resolveOptions';
import { trimLib } from '../../utils/trimLib/trimLib';
import { getTag } from '../../utils/graphUtils/filterProjects/filterProjects';

export async function moduleGenerator(
    tree: Tree,
    options: ModuleGeneratorSchema
) {
    const resolvedOptions = resolveOptions(options);
    const { skipFormat, project, name } = resolvedOptions;
    const { root, projectType, tags } = readProjectConfiguration(tree, project);
    const resolvedProject = names(project).constantName;
    const dirName = trimLib(project);
    const isApp = projectType === 'application';
    const include = isApp ? `"${name}.h"` : `<${dirName}/include/${name}.h>`;
    resolvedOptions.resolvedProject = resolvedProject;
    resolvedOptions.include = include;
    resolvedOptions.tag = getTag(tags);

    generateFiles(tree, join(__dirname, 'template'), root, resolvedOptions);

    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default moduleGenerator;
