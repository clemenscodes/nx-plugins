import { getGcc, type CTag } from '@/config';
import { getCmockaInclude } from '../getCmockaInclude/getCmockaInclude';
import { getGtestInclude } from '../getGtestInclude/getGtestInclude';
import { getIncludeDirectoriesFlag } from '../getIncludeDirectoriesFlag/getIncludeDirectoriesFlag';

export const getGccDependenciesCommand = (
    fileName: string,
    projectRoot: string,
    libsDir: string,
    tag: CTag,
): string => {
    const gtestInclude = getGtestInclude(libsDir);
    const cmockaInclude = getCmockaInclude(libsDir);
    const includeDirectoriesFlag = getIncludeDirectoriesFlag(libsDir);
    const language = tag === 'cpp' ? 'c++' : 'c';
    const gcc = getGcc();
    const cmd =
        `${gcc} -x ${language} -MM ${fileName}` +
        ` -I ${projectRoot}` +
        ` -I ${projectRoot}/include` +
        ` -I ${projectRoot}/src` +
        ` -I ${gtestInclude}` +
        ` -I ${cmockaInclude}` +
        ` ${includeDirectoriesFlag}`;
    return cmd;
};
