import type { TargetName } from '@/config';
import {
    BUILD_TARGET_NAME,
    CMAKE_TARGET_NAME,
    DEBUG_TARGET_NAME,
    EXECUTE_TARGET_NAME,
    FMT_TARGET_NAME,
    LINT_TARGET_NAME,
    TEST_TARGET_NAME,
} from '@/config';

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
