import type {
    LinkGeneratorSchema,
    BinGeneratorSchema,
    BinSchema,
} from '@/types';
import { CProjectType } from '@/types';
import { offsetFromRoot } from '@nx/devkit';
import { getLibName } from '../getLibName/getLibName';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';
import { resolveOptions } from '../resolveOptions/resolveOptions';

export const resolveBinOptions = (options: BinGeneratorSchema): BinSchema => {
    const resolvedOptions = resolveOptions<BinGeneratorSchema, BinSchema>(
        options,
    );
    const { name } = resolvedOptions;
    const linkOptions: LinkGeneratorSchema = {
        source: name,
        target: getLibName(name),
        link: 'shared',
    };
    const projectRoot = getProjectRoot(name, CProjectType.App);
    resolvedOptions.projectRoot = projectRoot;
    resolvedOptions.relativeRootPath = offsetFromRoot(projectRoot);
    resolvedOptions.linkOptions = linkOptions;
    return resolvedOptions;
};
