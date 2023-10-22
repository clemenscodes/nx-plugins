import type { NxTargetDefaults, TargetDefaultsWithDependsOn } from '@/types';
import type { TargetDefaults } from '@/config';
import { assertIsTargetName } from '@/config';
import { addTargetDependsOn } from '../addTargetDependsOn/addTargetDependsOn';

export const fillDependsOn = <T extends TargetDefaults>(
    targets: T,
    nxTargets: NonNullable<NxTargetDefaults>,
): NonNullable<TargetDefaultsWithDependsOn> => {
    const updatedNxTargets: NonNullable<TargetDefaultsWithDependsOn> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets[target] = addTargetDependsOn(
            nxTargets,
            target,
            targetConfig.dependsOn,
        );
    }
    return updatedNxTargets;
};
