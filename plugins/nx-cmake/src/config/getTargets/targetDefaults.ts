import { CmakeTargetConfiguration } from './getCmakeTargetDefault/getCmakeTargetDefault';
import { CompileTargetConfiguration } from './getCompileTargetDefault/getCompileTargetDefault';
import { DebugTargetConfiguration } from './getDebugTargetDefault/getDebugTargetDefault';
import { ExecuteTargetConfiguration } from './getExecuteTargetDefault/getExecuteTargetDefault';
import { FmtTargetConfiguration } from './getFmtTargetDefault/getFmtTargetDefault';
import { LintTargetConfiguration } from './getLintTargetDefault/getLintTargetDefault';
import { TestTargetConfiguration } from './getTestTargetDefault/getTestTargetDefault';

export type TargetDefaults = {
    cmake: CmakeTargetConfiguration;
    compile: CompileTargetConfiguration;
    fmt: FmtTargetConfiguration;
    lint: LintTargetConfiguration;
    test: TestTargetConfiguration;
    execute: ExecuteTargetConfiguration;
    debug: DebugTargetConfiguration;
};
