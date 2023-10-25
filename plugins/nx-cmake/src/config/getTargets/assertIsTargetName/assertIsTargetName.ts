import { CMAKE_TARGET_NAME } from '../getCmakeTargetDefault/getCmakeTargetDefault';
import { COMPILE_TARGET_NAME } from '../getCompileTargetDefault/getCompileTargetDefault';
import { DEBUG_TARGET_NAME } from '../getDebugTargetDefault/getDebugTargetDefault';
import { EXECUTE_TARGET_NAME } from '../getExecuteTargetDefault/getExecuteTargetDefault';
import { FMT_TARGET_NAME } from '../getFmtTargetDefault/getFmtTargetDefault';
import { LINT_TARGET_NAME } from '../getLintTargetDefault/getLintTargetDefault';
import { TEST_TARGET_NAME } from '../getTestTargetDefault/getTestTargetDefault';
import { TargetName } from '../targetName';

export function assertIsTargetName(s: string): asserts s is TargetName {
    switch (s) {
        case CMAKE_TARGET_NAME:
            break;
        case COMPILE_TARGET_NAME:
            break;
        case FMT_TARGET_NAME:
            break;
        case LINT_TARGET_NAME:
            break;
        case TEST_TARGET_NAME:
            break;
        case EXECUTE_TARGET_NAME:
            break;
        case DEBUG_TARGET_NAME:
            break;
        default:
            throw new Error(`${s} is not a valid target`);
    }
}
