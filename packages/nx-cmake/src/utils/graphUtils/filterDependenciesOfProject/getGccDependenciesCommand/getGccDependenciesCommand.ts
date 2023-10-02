import type { CTag, WorkspaceLayout } from '../../../../models/types';
import { getCmockaInclude } from '../getCmockaInclude/getCmockaInclude';
import { getGtestInclude } from '../getGtestInclude/getGtestInclude';
import { getWorkspaceIncludeDir } from '../../../pluginUtils/getWorkspaceIncludeDir/getWorkspaceIncludeDir';
import { isDarwin } from '../../../pluginUtils/isDarwin/isDarwin';
import { GCC, DARWIN_GCC } from '../../../../config/programs';

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
    const cc = isDarwin(process.platform) ? DARWIN_GCC : GCC;
    const cmd =
        `${cc} -x ${language} -MM ${fileName}` +
        ` -I ${projectRoot}` +
        ` -I ${projectRoot}/include` +
        ` -I ${projectRoot}/src` +
        ` -I ${libsDir}` +
        ` -I ${includeDir}` +
        ` -I ${gtestInclude}` +
        ` -I ${cmockaInclude}`;

    return cmd;
};
