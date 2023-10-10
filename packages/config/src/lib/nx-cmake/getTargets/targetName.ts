import { BuildTargetName } from './getBuildTarget/getBuildTarget';
import { CmakeTargetName } from './getCmakeTarget/getCmakeTarget';
import { DebugTargetName } from './getDebugTargets/getDebugTargets';
import { ExecuteTargetName } from './getExecuteTargets/getExecuteTargets';
import { FmtTargetName } from './getFmtTarget/getFmtTarget';
import { LintTargetName } from './getLintTarget/getLintTarget';
import { TestTargetName } from './getTestTarget/getTestTarget';

export type TargetName =
    | CmakeTargetName
    | BuildTargetName
    | LintTargetName
    | FmtTargetName
    | TestTargetName
    | ExecuteTargetName
    | DebugTargetName;
