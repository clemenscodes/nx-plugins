import type { NxTargetDefaults } from '@/types';
import type { TargetDefaults } from '@/config';
import { assertIsTargetName } from '@/config';
import { addTargetDefault } from '../addTargetDefault/addTargetDefault';

export const fillEmptyTargets = <T extends TargetDefaults>(
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
