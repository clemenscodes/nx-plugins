import type { NxTargetDefaults } from '@/types';
import type { TargetName } from '@/config';
import { getTargetDefaults, TargetDefaults } from '@/config';

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
