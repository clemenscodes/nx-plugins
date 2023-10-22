import { TargetDefaults } from '..';
import { getCmakeTargetDefault } from '../getCmakeTargetDefault/getCmakeTargetDefault';
import { getCompileTargetDefault } from '../getCompileTargetDefault/getCompileTargetDefault';
import { getDebugTargetDefault } from '../getDebugTargetDefault/getDebugTargetDefault';
import { getExecuteTargetDefault } from '../getExecuteTargetDefault/getExecuteTargetDefault';
import { getFmtTargetDefault } from '../getFmtTargetDefault/getFmtTargetDefault';
import { getLintTargetDefault } from '../getLintTargetDefault/getLintTargetDefault';
import { getTestTargetDefault } from '../getTestTargetDefault/getTestTargetDefault';

export const getTargetDefaults = (): TargetDefaults => {
    const targetDefaults: TargetDefaults = {
        cmake: getCmakeTargetDefault(),
        compile: getCompileTargetDefault(),
        fmt: getFmtTargetDefault(),
        lint: getLintTargetDefault(),
        test: getTestTargetDefault(),
        execute: getExecuteTargetDefault(),
        debug: getDebugTargetDefault(),
    };
    return targetDefaults;
};
