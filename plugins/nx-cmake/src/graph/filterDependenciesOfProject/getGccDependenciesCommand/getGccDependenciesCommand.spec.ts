import type { CTag } from '@/types';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';
import * as utilsModule from '@/util';
import * as getIncludeDirectoriesFlagModule from '../getIncludeDirectoriesFlag/getIncludeDirectoriesFlag';
import * as getGccModule from '../../../config/getPrograms/getGcc/getGcc';
import { LINUX_GCC } from '../../../config/getPrograms/getPrograms';

describe('getGccDependenciesCommand', () => {
    let fileName: string;
    let projectRoot: string;
    let tag: CTag;
    let libsDir: string;
    let getIncludeDirectoriesFlagReturnMock: string;

    beforeEach(() => {
        fileName = 'testfile.c';
        projectRoot = 'projectA';
        tag = 'c';
        libsDir = 'libs';
        getIncludeDirectoriesFlagReturnMock = '-I libs/someProject/include';
        jest.spyOn(utilsModule, 'isWindows').mockReturnValue(false);
        jest.spyOn(utilsModule, 'isDarwin').mockReturnValue(false);
        jest.spyOn(getGccModule, 'getGcc').mockReturnValue(LINUX_GCC[0]);
        jest.spyOn(
            getIncludeDirectoriesFlagModule,
            'getIncludeDirectoriesFlag',
        ).mockReturnValue(getIncludeDirectoriesFlagReturnMock);
    });

    it('linux should generate the correct gcc c dependency command', () => {
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            libsDir,
            tag,
        );
        const expectedCmd =
            `${LINUX_GCC[0]} ` +
            `-x c ` +
            `-MM ` +
            `${fileName} ` +
            `-I projectA ` +
            `-I projectA/include ` +
            `-I projectA/src ` +
            `-I dist/libs/gtest/googletest-src/googletest/include ` +
            `-I dist/libs/cmocka/cmocka-src/include ` +
            `${getIncludeDirectoriesFlagReturnMock}`;
        expect(result).toBe(expectedCmd);
    });

    it('should generate the correct gcc c++ dependency command', () => {
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            libsDir,
            tag,
        );
        const expectedCmd =
            `${LINUX_GCC[0]} ` +
            `-x c++ ` +
            `-MM ` +
            `${fileName} ` +
            `-I projectA ` +
            `-I projectA/include ` +
            `-I projectA/src ` +
            `-I dist/libs/gtest/googletest-src/googletest/include ` +
            `-I dist/libs/cmocka/cmocka-src/include ` +
            `${getIncludeDirectoriesFlagReturnMock}`;
        expect(result).toBe(expectedCmd);
    });
});
