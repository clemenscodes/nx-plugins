import type { NxTargetDefaults } from '@/types';
import { addTargetDefault } from '../addTargetDefault/addTargetDefault';
import { TargetDefaults } from '../../../../config/getTargets/targetDefaults';
import { assertIsTargetName } from '../../../../config';

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
