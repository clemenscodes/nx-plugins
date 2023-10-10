import { BUILD_TARGET_NAME } from '../getBuildTarget/getBuildTarget';
import { CMAKE_TARGET_NAME } from '../getCmakeTarget/getCmakeTarget';
import { DEBUG_TARGET_NAME } from '../getDebugTargets/getDebugTargets';
import { EXECUTE_TARGET_NAME } from '../getExecuteTargets/getExecuteTargets';
import { FMT_TARGET_NAME } from '../getFmtTarget/getFmtTarget';
import { LINT_TARGET_NAME } from '../getLintTarget/getLintTarget';
import { TEST_TARGET_NAME } from '../getTestTarget/getTestTarget';
import { TargetName } from '../targetName';

export function assertIsTargetName(s: string): asserts s is TargetName {
    switch (s) {
        case CMAKE_TARGET_NAME:
            break;
        case BUILD_TARGET_NAME:
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
