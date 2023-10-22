import type {
    NxTargetDefaults,
    TargetConfigurationWithDependsOn,
} from '@/types';
import { mergeArrays } from '@/util';
import { TargetName } from '../../../config/getTargets/targetName';
import { TargetDefaults } from '../../../config/getTargets/targetDefaults';

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
