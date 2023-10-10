import type {
    PluginDefaults,
    TargetDefaultsWithDependsOn,
    TargetDefaultsWithInputs,
} from '@/config';
import { assertIsTargetName } from '../../assertIsTargetName/assertIsTargetName';
import { addTargetInputs } from '../addTargetInputs/addTargetInputs';

export const fillInputs = <T extends PluginDefaults>(
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
