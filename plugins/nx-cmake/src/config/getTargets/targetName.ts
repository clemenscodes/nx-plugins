import { CmakeTargetName } from './getCmakeTargetDefault/getCmakeTargetDefault';
import { CompileTargetName } from './getCompileTargetDefault/getCompileTargetDefault';
import { DebugTargetName } from './getDebugTargetDefault/getDebugTargetDefault';
import { ExecuteTargetName } from './getExecuteTargetDefault/getExecuteTargetDefault';
import { FmtTargetName } from './getFmtTargetDefault/getFmtTargetDefault';
import { LintTargetName } from './getLintTargetDefault/getLintTargetDefault';
import { TestTargetName } from './getTestTargetDefault/getTestTargetDefault';

export type TargetName =
    | CmakeTargetName
    | CompileTargetName
    | LintTargetName
    | FmtTargetName
    | TestTargetName
    | ExecuteTargetName
    | DebugTargetName;
