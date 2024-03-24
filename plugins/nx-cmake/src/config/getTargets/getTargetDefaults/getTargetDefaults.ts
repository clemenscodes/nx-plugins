import { TargetDefaults } from '..';
import {
    CMAKE_TARGET_NAME,
    getCmakeTargetDefault,
} from '../getCmakeTargetDefault/getCmakeTargetDefault';
import {
    COMPILE_TARGET_NAME,
    getCompileTargetDefault,
} from '../getCompileTargetDefault/getCompileTargetDefault';
import {
    DEBUG_TARGET_NAME,
    getDebugTargetDefault,
} from '../getDebugTargetDefault/getDebugTargetDefault';
import {
    EXECUTE_TARGET_NAME,
    getExecuteTargetDefault,
} from '../getExecuteTargetDefault/getExecuteTargetDefault';
import {
    FMT_TARGET_NAME,
    getFmtTargetDefault,
} from '../getFmtTargetDefault/getFmtTargetDefault';
import {
    LINT_TARGET_NAME,
    getLintTargetDefault,
} from '../getLintTargetDefault/getLintTargetDefault';
import {
    TEST_TARGET_NAME,
    getTestTargetDefault,
} from '../getTestTargetDefault/getTestTargetDefault';

export const getTargetDefaults = (): TargetDefaults => {
    const targetDefaults: TargetDefaults = {
        [CMAKE_TARGET_NAME]: getCmakeTargetDefault(),
        [COMPILE_TARGET_NAME]: getCompileTargetDefault(),
        [FMT_TARGET_NAME]: getFmtTargetDefault(),
        [LINT_TARGET_NAME]: getLintTargetDefault(),
        [TEST_TARGET_NAME]: getTestTargetDefault(),
        [EXECUTE_TARGET_NAME]: getExecuteTargetDefault(),
        [DEBUG_TARGET_NAME]: getDebugTargetDefault(),
    };
    return targetDefaults;
};
