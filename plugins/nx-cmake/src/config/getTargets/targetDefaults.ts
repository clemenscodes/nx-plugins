import {
    CMAKE_TARGET_NAME,
    CmakeTargetConfiguration,
} from './getCmakeTargetDefault/getCmakeTargetDefault';
import {
    COMPILE_TARGET_NAME,
    CompileTargetConfiguration,
} from './getCompileTargetDefault/getCompileTargetDefault';
import {
    DEBUG_TARGET_NAME,
    DebugTargetConfiguration,
} from './getDebugTargetDefault/getDebugTargetDefault';
import {
    EXECUTE_TARGET_NAME,
    ExecuteTargetConfiguration,
} from './getExecuteTargetDefault/getExecuteTargetDefault';
import {
    FMT_TARGET_NAME,
    FmtTargetConfiguration,
} from './getFmtTargetDefault/getFmtTargetDefault';
import {
    LINT_TARGET_NAME,
    LintTargetConfiguration,
} from './getLintTargetDefault/getLintTargetDefault';
import {
    TEST_TARGET_NAME,
    TestTargetConfiguration,
} from './getTestTargetDefault/getTestTargetDefault';

export type TargetDefaults = {
    [CMAKE_TARGET_NAME]: CmakeTargetConfiguration;
    [COMPILE_TARGET_NAME]: CompileTargetConfiguration;
    [FMT_TARGET_NAME]: FmtTargetConfiguration;
    [LINT_TARGET_NAME]: LintTargetConfiguration;
    [TEST_TARGET_NAME]: TestTargetConfiguration;
    [EXECUTE_TARGET_NAME]: ExecuteTargetConfiguration;
    [DEBUG_TARGET_NAME]: DebugTargetConfiguration;
};
