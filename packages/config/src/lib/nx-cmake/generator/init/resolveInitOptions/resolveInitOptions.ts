import { offsetFromRoot } from '@nx/devkit';
import { InitGeneratorSchema, InitSchema } from '../../generator';

export const resolveInitOptions = (
    options: InitGeneratorSchema,
): InitSchema => {
    const { cmakeConfigDir } = options;
    const resolvedOptions: InitSchema = {
        ...options,
        relativeCmakeConfigPath: offsetFromRoot(cmakeConfigDir),
    };
    return resolvedOptions;
};
