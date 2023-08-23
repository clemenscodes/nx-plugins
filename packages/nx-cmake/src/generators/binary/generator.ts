import { join } from 'path';
import type { BinGeneratorSchema } from './schema';
import {
    type Tree,
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    offsetFromRoot,
    workspaceLayout,
} from '@nx/devkit';
import { getProjectTargets } from '../../utils/getProjectTargets';
import { resolveOptions } from '../../utils/resolveOptions';
import libGenerator from '../library/generator';
import { linkLibrary } from '../../utils/linkLibrary';
import { LibGeneratorSchema } from '../library/schema';
import { CProjectType } from '../../models/types';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveOptions(options);
    const { name, skipFormat, languageExtension } = resolvedOptions;
    const { appsDir } = workspaceLayout();
    const projectRoot = `${appsDir}/${name}`;
    const relativeRootPath = offsetFromRoot(projectRoot);
    const targets = getProjectTargets(CProjectType.App);
    resolvedOptions.relativeRootPath = relativeRootPath;

    await libGenerator(tree, resolvedOptions as LibGeneratorSchema);

    addProjectConfiguration(tree, name, {
        root: projectRoot,
        projectType: 'application',
        sourceRoot: `${projectRoot}/src`,
        tags: [languageExtension],
        targets,
    });

    generateFiles(
        tree,
        join(__dirname, 'template'),
        projectRoot,
        resolvedOptions
    );

    linkLibrary(tree, name, 'shared', `lib${name}`);

    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default binGenerator;
