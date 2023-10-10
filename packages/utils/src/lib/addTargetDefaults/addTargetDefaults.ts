import type { NxJsonConfiguration } from '@nx/devkit';
import { getTargetDefaults } from '@/config';
import { fillInputs } from './fillInputs/fillInputs';
import { fillDependsOn } from './fillDependsOn/fillDependsOn';
import { fillEmptyTargets } from './fillEmptyTargets/fillEmptyTargets';

export const addTargetDefaults = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const pluginTargetDefaults = getTargetDefaults();
    const targetDefaults = fillEmptyTargets(
        pluginTargetDefaults,
        updatedNxJson.targetDefaults,
    );
    const targetDefaultsWithDependsOn = fillDependsOn(
        pluginTargetDefaults,
        targetDefaults,
    );
    const targetsWithInputs = fillInputs(
        pluginTargetDefaults,
        targetDefaultsWithDependsOn,
    );
    updatedNxJson.targetDefaults = targetsWithInputs;
    return updatedNxJson;
};
