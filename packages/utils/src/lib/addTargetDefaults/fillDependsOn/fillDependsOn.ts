import type {
    PluginDefaults,
    NxTargetDefaults,
    TargetDefaultsWithDependsOn,
} from '@/config';
import { assertIsTargetName } from '../../assertIsTargetName/assertIsTargetName';
import { addTargetDependsOn } from '../addTargetDependsOn/addTargetDependsOn';

export const fillDependsOn = <T extends PluginDefaults>(
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
