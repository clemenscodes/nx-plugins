import { BuildTargetName } from './getBuildTargetDefault/getBuildTargetDefault';
import { CmakeTargetName } from './getCmakeTargetDefault/getCmakeTargetDefault';
import { DebugTargetName } from './getDebugTargetDefault/getDebugTargetDefault';
import { ExecuteTargetName } from './getExecuteTargetDefault/getExecuteTargetDefault';
import { FmtTargetName } from './getFmtTargetDefault/getFmtTargetDefault';
import { LintTargetName } from './getLintTargetDefault/getLintTargetDefault';
import { TestTargetName } from './getTestTargetDefault/getTestTargetDefault';

export type TargetName =
    | CmakeTargetName
    | BuildTargetName
    | LintTargetName
    | FmtTargetName
    | TestTargetName
    | ExecuteTargetName
    | DebugTargetName;
