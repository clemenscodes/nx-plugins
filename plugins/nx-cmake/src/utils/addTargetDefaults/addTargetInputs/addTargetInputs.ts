import type { NxTargetDefaults, TargetConfigurationWithInputs } from '@/types';
import { mergeArrays } from '@/util';
import { TargetName } from '../../../config/getTargets/targetName';
import { TargetDefaults } from '../../../config/getTargets/targetDefaults';

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
