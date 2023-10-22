import type {
    NxTargetDefaults,
    TargetConfigurationWithDependsOn,
} from '@/types';
import type { TargetName, TargetDefaults } from '@/config';
import { mergeArrays } from '@/util';

export const addTargetDependsOn = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultDependsOn: TargetDefaults[TargetName]['dependsOn'],
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
