import { assertIsTargetName, type TargetDefaults } from '@/config';
import { addTargetInputs } from '../addTargetInputs/addTargetInputs';
import type {
    TargetDefaultsWithDependsOn,
    TargetDefaultsWithInputs,
} from '@/types';

export const fillInputs = <T extends TargetDefaults>(
    targets: T,
    nxTargets: NonNullable<TargetDefaultsWithDependsOn>,
): NonNullable<TargetDefaultsWithInputs> => {
    const updatedNxTargets: NonNullable<TargetDefaultsWithInputs> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets[target] = addTargetInputs(
            nxTargets,
            target,
            targetConfig.inputs,
        );
    }
    return updatedNxTargets;
};
