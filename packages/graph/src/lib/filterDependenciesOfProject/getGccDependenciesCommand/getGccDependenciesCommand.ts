import type { CTag } from '@/config';
import { getCmockaInclude } from '../getCmockaInclude/getCmockaInclude';
import { getGtestInclude } from '../getGtestInclude/getGtestInclude';
import { getGcc, getWorkspaceIncludeDir } from '@/utils';

export const getGccDependenciesCommand = (
    fileName: string,
    projectRoot: string,
    libsDir: string,
    tag: CTag,
): string => {
    const includeDir = getWorkspaceIncludeDir();
    const gtestInclude = getGtestInclude(libsDir);
    const cmockaInclude = getCmockaInclude(libsDir);
    const language = tag === 'cpp' ? 'c++' : 'c';
    const gcc = getGcc();
    const cmd =
        `${gcc} -x ${language} -MM ${fileName}` +
        ` -I ${projectRoot}` +
        ` -I ${projectRoot}/include` +
        ` -I ${projectRoot}/src` +
        ` -I ${libsDir}` +
        ` -I ${includeDir}` +
        ` -I ${gtestInclude}` +
        ` -I ${cmockaInclude}`;

    return cmd;
};
