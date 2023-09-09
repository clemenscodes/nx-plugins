import { join } from 'path';
import libGenerator from '../library/generator';
import { getProjectTargets } from '../../utils/getProjectTargets/getProjectTargets';
import { resolveOptions } from '../../utils/resolveOptions/resolveOptions';
import { CProjectType } from '../../models/types';
import { linkLibrary } from '../link/utils/linkLibrary/linkLibrary';
import { getProjectRoot } from '../../utils/getProjectRoot/getProjectRoot';
import type { BinGeneratorSchema } from './schema';
import type { LibGeneratorSchema } from '../library/schema';
import {
    type Tree,
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    offsetFromRoot,
} from '@nx/devkit';

export async function binGenerator(tree: Tree, options: BinGeneratorSchema) {
    const resolvedOptions = resolveOptions(options);
    const { name, skipFormat, languageExtension } = resolvedOptions;
    const projectRoot = getProjectRoot(name, CProjectType.App);
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
