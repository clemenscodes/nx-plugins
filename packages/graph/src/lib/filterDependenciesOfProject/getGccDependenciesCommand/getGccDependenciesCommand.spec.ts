import type { CTag } from '@/config';
import { LINUX_GCC } from '@/config';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';
import * as configModule from '@/config';
import * as getIncludeDirectoriesFlagModule from '../getIncludeDirectoriesFlag/getIncludeDirectoriesFlag';

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
        jest.spyOn(configModule, 'isWindows').mockReturnValue(false);
        jest.spyOn(configModule, 'isDarwin').mockReturnValue(false);
        jest.spyOn(
            getIncludeDirectoriesFlagModule,
            'getIncludeDirectoriesFlag',
        ).mockReturnValue(getIncludeDirectoriesFlagReturnMock);
    });

    afterEach(() => {
        jest.restoreAllMocks;
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
});
