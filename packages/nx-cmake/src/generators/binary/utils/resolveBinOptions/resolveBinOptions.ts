import { BinGeneratorSchema, BinSchema } from '../../schema';
import { resolveOptions } from '../../../../utils/generatorUtils/resolveOptions/resolveOptions';
import { getProjectRoot } from '../../../../utils/generatorUtils/getProjectRoot/getProjectRoot';
import { CProjectType } from '../../../../models/types';

export const resolveBinOptions = (options: BinGeneratorSchema): BinSchema => {
    const resolvedOptions = resolveOptions<BinGeneratorSchema, BinSchema>(
        options
    );
    const { name } = resolvedOptions;
    const projectRoot = getProjectRoot(name, CProjectType.App);
    resolvedOptions.projectRoot = projectRoot;
    return resolvedOptions;
};
