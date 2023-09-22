import type { CTag, WorkspaceLayout } from '../../../../models/types';
import { getCmockaInclude } from '../getCmockaInclude/getCmockaInclude';
import { getGtestInclude } from '../getGtestInclude/getGtestInclude';
import { getWorkspaceIncludeDir } from '../getWorkspaceIncludeDir/getWorkspaceIncludeDir';

export const getGccDependenciesCommand = (
    fileName: string,
    projectRoot: string,
    workspaceLayout: WorkspaceLayout,
    tag: CTag,
): string => {
    const { libsDir } = workspaceLayout;
    const includeDir = getWorkspaceIncludeDir();
    const gtestInclude = getGtestInclude(workspaceLayout);
    const cmockaInclude = getCmockaInclude(workspaceLayout);
    const language = tag === 'cpp' ? 'c++' : 'c';
    const cmd =
        `gcc -x ${language} -MM ${fileName}` +
        ` -I ${projectRoot}/include` +
        ` -I ${libsDir}` +
        ` -I ${includeDir}` +
        ` -I ${gtestInclude}` +
        ` -I ${cmockaInclude}`;

    return cmd;
};
