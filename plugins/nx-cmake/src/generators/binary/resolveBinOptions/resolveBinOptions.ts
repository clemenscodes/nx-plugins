import { CProjectType } from '@/types';
import { offsetFromRoot } from '@nx/devkit';
import { getLibName, getProjectRoot } from '@/util';
import {
    BinGeneratorSchema,
    BinSchema,
    LinkGeneratorSchema,
} from '../../generator';
import { resolveOptions } from '../../../utils/resolveOptions/resolveOptions';

export const resolveBinOptions = (options: BinGeneratorSchema): BinSchema => {
    const resolvedOptions = resolveOptions<BinGeneratorSchema, BinSchema>(
        options,
    );
    const { name } = resolvedOptions;
    const linkOptions: LinkGeneratorSchema = {
        source: name,
        target: getLibName(name),
    };
    const projectRoot = getProjectRoot(name, CProjectType.App);
    resolvedOptions.projectRoot = projectRoot;
    resolvedOptions.relativeRootPath = offsetFromRoot(projectRoot);
    resolvedOptions.linkOptions = linkOptions;
    return resolvedOptions;
};
