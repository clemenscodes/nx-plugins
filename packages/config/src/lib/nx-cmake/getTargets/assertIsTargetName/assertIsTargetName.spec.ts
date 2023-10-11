import { BUILD_TARGET_NAME } from '../getBuildTargetDefault/getBuildTargetDefault';
import { CMAKE_TARGET_NAME } from '../getCmakeTargetDefault/getCmakeTargetDefault';
import { DEBUG_TARGET_NAME } from '../getDebugTargetDefault/getDebugTargetDefault';
import { EXECUTE_TARGET_NAME } from '../getExecuteTargetDefault/getExecuteTargetDefault';
import { FMT_TARGET_NAME } from '../getFmtTargetDefault/getFmtTargetDefault';
import { LINT_TARGET_NAME } from '../getLintTargetDefault/getLintTargetDefault';
import { TEST_TARGET_NAME } from '../getTestTargetDefault/getTestTargetDefault';
import { assertIsTargetName } from './assertIsTargetName';

describe('assertIsTargetName', () => {
    it('should not throw an error for valid target names', () => {
        expect(() => assertIsTargetName(CMAKE_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(BUILD_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(FMT_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(LINT_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(TEST_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(EXECUTE_TARGET_NAME)).not.toThrow();
        expect(() => assertIsTargetName(DEBUG_TARGET_NAME)).not.toThrow();
    });

    it('should throw an error for an invalid target name', () => {
        expect(() => assertIsTargetName('invalidTargetName')).toThrowError(
            'invalidTargetName is not a valid target',
        );
    });
});
