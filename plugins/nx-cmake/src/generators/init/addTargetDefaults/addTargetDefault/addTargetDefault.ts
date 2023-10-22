import type { NxTargetDefaults } from '@/types';
import { TargetName } from '../../../../config/getTargets/targetName';
import { TargetDefaults } from '../../../../config/getTargets/targetDefaults';
import { getTargetDefaults } from '../../../../config/getTargets/getTargetDefaults/getTargetDefaults';

export const addTargetDefault = (
    targetDefaults: NxTargetDefaults,
    field: TargetName,
    defaultValue: TargetDefaults[TargetName],
): NonNullable<NxTargetDefaults> => {
    if (!targetDefaults) {
        targetDefaults = getTargetDefaults();
    }
    if (!(field in targetDefaults)) {
        targetDefaults[field] = defaultValue;
    }
    return targetDefaults;
};
