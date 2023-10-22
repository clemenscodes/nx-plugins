import type { NxTargetDefaults, TargetConfigurationWithInputs } from '@/types';
import type { TargetDefaults, TargetName } from '@/config';
import { mergeArrays } from '@/util';

export const addTargetInputs = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultInputs: TargetDefaults[TargetName]['inputs'],
): TargetConfigurationWithInputs => {
    const targetConfig = targetDefaults[field];
    const mergedInputs = mergeArrays(targetConfig.inputs, defaultInputs);
    const targetConfigWithInputs: TargetConfigurationWithInputs = {
        ...targetConfig,
        inputs: mergedInputs,
    };
    return targetConfigWithInputs;
};
