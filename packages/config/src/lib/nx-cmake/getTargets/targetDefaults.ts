import { BuildTargetConfiguration } from './getBuildTargetDefault/getBuildTargetDefault';
import { CmakeTargetConfiguration } from './getCmakeTargetDefault/getCmakeTargetDefault';
import { DebugTargetConfiguration } from './getDebugTargetDefault/getDebugTargetDefault';
import { ExecuteTargetConfiguration } from './getExecuteTargetDefault/getExecuteTargetDefault';
import { FmtTargetConfiguration } from './getFmtTargetDefault/getFmtTargetDefault';
import { LintTargetConfiguration } from './getLintTargetDefault/getLintTargetDefault';
import { TestTargetConfiguration } from './getTestTargetDefault/getTestTargetDefault';

export type TargetDefaults = {
    cmake: CmakeTargetConfiguration;
    build: BuildTargetConfiguration;
    fmt: FmtTargetConfiguration;
    lint: LintTargetConfiguration;
    test: TestTargetConfiguration;
    execute: ExecuteTargetConfiguration;
    debug: DebugTargetConfiguration;
};
