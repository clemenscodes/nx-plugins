import type { LintExecutorSchema } from '../../schema';
import { getLintArguments } from './getLintArguments';
import * as getClangTidyConfigArgumentModule from './getClangTidyConfigArgument/getClangTidyConfigArgument';

describe('getLintArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: LintExecutorSchema;
    let expectedArguments: string[];
    let getClangTidyConfigArgumentMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        options = {
            args: [],
        };
        expectedArguments = [
            `--config-file=${workspaceRoot}/${projectRoot}/.clang-format`,
            `-p=${workspaceRoot}/dist/${projectRoot}/compile_commands.json`,
        ];
        getClangTidyConfigArgumentMock = jest
            .spyOn(
                getClangTidyConfigArgumentModule,
                'getClangTidyConfigArgument',
            )
            .mockImplementation(async (workspaceRoot, projectRoot) => {
                return `--config-file=${workspaceRoot}/${projectRoot}/.clang-format`;
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get lint arguments for clang-tidy', async () => {
        const result = await getLintArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toStrictEqual(expectedArguments);
    });

    it('should add arguments at the end', async () => {
        options.args = ['--arg1', '--arg2'];
        expectedArguments.push('--arg1');
        expectedArguments.push('--arg2');
        const result = await getLintArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toStrictEqual(expectedArguments);
    });

    it('should error if config file does not exist', async () => {
        getClangTidyConfigArgumentMock.mockImplementation(async () => {
            throw new Error();
        });
        await expect(
            async () =>
                await getLintArguments(workspaceRoot, projectRoot, options),
        ).rejects.toThrowError();
    });
});
