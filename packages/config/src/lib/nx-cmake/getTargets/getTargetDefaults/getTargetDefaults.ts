import { TargetDefaults } from '..';
import { getBuildTargetDefault } from '../getBuildTargetDefault/getBuildTargetDefault';
import { getCmakeTargetDefault } from '../getCmakeTargetDefault/getCmakeTargetDefault';
import { getDebugTargetDefault } from '../getDebugTargetDefault/getDebugTargetDefault';
import { getExecuteTargetDefault } from '../getExecuteTargetDefault/getExecuteTargetDefault';
import { getFmtTargetDefault } from '../getFmtTargetDefault/getFmtTargetDefault';
import { getLintTargetDefault } from '../getLintTargetDefault/getLintTargetDefault';
import { getTestTargetDefault } from '../getTestTargetDefault/getTestTargetDefault';

export const getTargetDefaults = (): TargetDefaults => {
    const targetDefaults: TargetDefaults = {
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
