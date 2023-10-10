import type {
    NxTargetDefaults,
    TargetName,
    PluginDefaults,
    TargetConfigurationWithDependsOn,
} from '@/config';
import { mergeArrays } from '../../mergeArrays/mergeArrays';

export const addTargetDependsOn = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultDependsOn: PluginDefaults[TargetName]['dependsOn'],
): TargetConfigurationWithDependsOn => {
    const targetConfig = targetDefaults[field];
    const mergedDependsOn = mergeArrays(
        targetConfig.dependsOn,
        defaultDependsOn,
    );
    const targetConfigWithDependsOn: TargetConfigurationWithDependsOn = {
        ...targetConfig,
        dependsOn: mergedDependsOn,
    };
    return targetConfigWithDependsOn;
};
