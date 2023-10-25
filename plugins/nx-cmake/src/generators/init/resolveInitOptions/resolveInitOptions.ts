import { offsetFromRoot } from '@nx/devkit';
import { getCmakeC } from '../getCmakeC/getCmakeC';
import { InitGeneratorSchema, InitSchema } from '../../generator';

export const resolveInitOptions = (
    options: InitGeneratorSchema,
): InitSchema => {
    const { cmakeConfigDir, language } = options;
    const resolvedOptions: InitSchema = {
        ...options,
        relativeCmakeConfigPath: offsetFromRoot(cmakeConfigDir),
        cmakeC: getCmakeC(language),
    };

    return resolvedOptions;
};
