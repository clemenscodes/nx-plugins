import {
    assertIsTargetName,
    type TargetDefaults,
    type TargetDefaultsWithDependsOn,
    type TargetDefaultsWithInputs,
} from '@/config';
import { addTargetInputs } from '../addTargetInputs/addTargetInputs';

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
