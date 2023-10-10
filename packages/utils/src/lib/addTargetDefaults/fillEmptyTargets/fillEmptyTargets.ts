import type { PluginDefaults, NxTargetDefaults } from '@/config';
import { assertIsTargetName } from '../../assertIsTargetName/assertIsTargetName';
import { addTargetDefault } from '../addTargetDefault/addTargetDefault';

export const fillEmptyTargets = <T extends PluginDefaults>(
    targets: T,
    nxTargets: NxTargetDefaults,
): NonNullable<NxTargetDefaults> => {
    let updatedNxTargets: NonNullable<NxTargetDefaults> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets = addTargetDefault(nxTargets, target, targetConfig);
    }
    return updatedNxTargets;
};
