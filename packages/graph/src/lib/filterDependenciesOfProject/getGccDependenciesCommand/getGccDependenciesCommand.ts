import type { CTag } from '@/types';
import { LINUX_GCC, DARWIN_GCC } from '@/config';
import { getCmockaInclude } from '../getCmockaInclude/getCmockaInclude';
import { getGtestInclude } from '../getGtestInclude/getGtestInclude';
import { getWorkspaceIncludeDir, isDarwin } from '@/utils';

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
    const cc = isDarwin(process.platform) ? DARWIN_GCC : LINUX_GCC;
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
