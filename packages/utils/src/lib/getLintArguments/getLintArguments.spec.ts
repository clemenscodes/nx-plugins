import { CLANG_FORMAT_CONFIG_FILE, LintExecutorSchema } from '@/config';
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
            release: false,
        };
        expectedArguments = [
            `--config-file=${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`,
            `-p=${workspaceRoot}/dist/${projectRoot}/compile_commands.json`,
        ];
        getClangTidyConfigArgumentMock = jest
            .spyOn(
                getClangTidyConfigArgumentModule,
                'getClangTidyConfigArgument',
            )
            .mockImplementation((workspaceRoot, projectRoot) => {
                return `--config-file=${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`;
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get lint arguments for clang-tidy', () => {
        const result = getLintArguments(workspaceRoot, projectRoot, options);
        expect(result).toStrictEqual(expectedArguments);
    });

    it('should add arguments at the end', () => {
        options.args = ['--arg1', '--arg2'];
        expectedArguments.push('--arg1');
        expectedArguments.push('--arg2');
        const result = getLintArguments(workspaceRoot, projectRoot, options);
        expect(result).toStrictEqual(expectedArguments);
    });

    it('should error if config file does not exist', () => {
        getClangTidyConfigArgumentMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            getLintArguments(workspaceRoot, projectRoot, options),
        ).toThrowError();
    });
});
