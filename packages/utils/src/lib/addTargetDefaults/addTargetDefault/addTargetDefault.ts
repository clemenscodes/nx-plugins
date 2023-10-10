import {
    type NxTargetDefaults,
    type TargetName,
    type PluginDefaults,
    getTargetDefaults,
} from '@/config';

export const addTargetDefault = (
    targetDefaults: NxTargetDefaults,
    field: TargetName,
    defaultValue: PluginDefaults[TargetName],
): NonNullable<NxTargetDefaults> => {
    if (!targetDefaults) {
        targetDefaults = getTargetDefaults();
    }
    if (!(field in targetDefaults)) {
        targetDefaults[field] = defaultValue;
    }
    return targetDefaults;
};
