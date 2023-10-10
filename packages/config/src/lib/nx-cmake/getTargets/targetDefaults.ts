import { BuildTargetConfiguration } from './getBuildTarget/getBuildTarget';
import { CmakeTargetConfiguration } from './getCmakeTarget/getCmakeTarget';
import { DebugTargetConfiguration } from './getDebugTargets/getDebugTargets';
import { ExecuteTargetConfiguration } from './getExecuteTargets/getExecuteTargets';
import { FmtTargetConfiguration } from './getFmtTarget/getFmtTarget';
import { LintTargetConfiguration } from './getLintTarget/getLintTarget';
import { TestTargetConfiguration } from './getTestTarget/getTestTarget';

export type TargetDefaults = {
    cmake: CmakeTargetConfiguration;
    build: BuildTargetConfiguration;
    fmt: FmtTargetConfiguration;
    lint: LintTargetConfiguration;
    test: TestTargetConfiguration;
    execute: ExecuteTargetConfiguration;
    debug: DebugTargetConfiguration;
};
