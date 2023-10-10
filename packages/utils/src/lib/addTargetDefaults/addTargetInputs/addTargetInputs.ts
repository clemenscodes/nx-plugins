import type {
    NxTargetDefaults,
    PluginDefaults,
    TargetConfigurationWithInputs,
    TargetName,
} from '@/config';
import { mergeArrays } from '../../mergeArrays/mergeArrays';

export const addTargetInputs = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultInputs: PluginDefaults[TargetName]['inputs'],
): TargetConfigurationWithInputs => {
    const targetConfig = targetDefaults[field];
    const mergedInputs = mergeArrays(targetConfig.inputs, defaultInputs);
    const targetConfigWithInputs: TargetConfigurationWithInputs = {
        ...targetConfig,
        inputs: mergedInputs,
    };
    return targetConfigWithInputs;
};
