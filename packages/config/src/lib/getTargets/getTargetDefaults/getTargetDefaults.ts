import { PluginDefaults } from '../../nx-cmake.types';
import { getBuildTargetDefault } from '../getBuildTarget/getBuildTarget';
import { getCmakeTargetDefault } from '../getCmakeTarget/getCmakeTarget';
import { getDebugTargetDefault } from '../getDebugTargets/getDebugTargets';
import { getExecuteTargetDefault } from '../getExecuteTargets/getExecuteTargets';
import { getFmtTargetDefault } from '../getFmtTarget/getFmtTarget';
import { getLintTargetDefault } from '../getLintTarget/getLintTarget';
import { getTestTargetDefault } from '../getTestTarget/getTestTarget';

export const getTargetDefaults = (): PluginDefaults => {
    const targetDefaults: PluginDefaults = {
        cmake: getCmakeTargetDefault(),
        build: getBuildTargetDefault(),
        fmt: getFmtTargetDefault(),
        lint: getLintTargetDefault(),
        test: getTestTargetDefault(),
        execute: getExecuteTargetDefault(),
        debug: getDebugTargetDefault(),
    };
    return targetDefaults;
};
