import type { NxTargetDefaults, TargetDefaultsWithDependsOn } from '@/types';
import { addTargetDependsOn } from '../addTargetDependsOn/addTargetDependsOn';
import { TargetDefaults } from '../../../config/getTargets/targetDefaults';
import { assertIsTargetName } from '../../../config/getTargets/assertIsTargetName/assertIsTargetName';

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
