import type { BinGeneratorSchema, BinSchema } from '../../schema';
import type { LinkGeneratorSchema } from '../../../link/schema';
import { resolveOptions } from '../../../../utils/generatorUtils/resolveOptions/resolveOptions';
import { getProjectRoot } from '../../../../utils/generatorUtils/getProjectRoot/getProjectRoot';
import { CProjectType } from '@/types';
import { getLibName } from '../../../library/utils/getLibName/getLibName';
import { offsetFromRoot } from '@nx/devkit';

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
