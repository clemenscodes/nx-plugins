import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from './getFormatArguments';
import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getFormatArguments', () => {
    let getConfigFileMock: jest.SpyInstance;
    let workspaceRoot: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: ['--arg1', '--arg2'],
            verbose: true,
            editFilesInPlace: true,
        };
        getConfigFileMock = jest
            .spyOn(getConfigFileModule, 'getConfigFile')
            .mockImplementation(async (workspaceRoot, projectRoot) => {
                return `${workspaceRoot}/${projectRoot}/.clang-format`;
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return format arguments with style, verbose, and in-place edit', async () => {
        const result = await getFormatArguments(
            workspaceRoot,
            projectRoot,
            options
        );

        expect(getConfigFileMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            '.clang-format'
        );

        expect(result).toEqual([
            `--style=file:${workspaceRoot}/${projectRoot}/.clang-format`,
            '--verbose',
            '-i',
            '--arg1',
            '--arg2',
        ]);
    });

    it('should return format arguments without verbose and in-place edit', async () => {
        options.editFilesInPlace = false;

        const result = await getFormatArguments(
            workspaceRoot,
            projectRoot,
            options
        );

        expect(getConfigFileMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            '.clang-format'
        );

        expect(result).toEqual([
            `--style=file:${workspaceRoot}/${projectRoot}/.clang-format`,
            '--verbose',
            '--arg1',
            '--arg2',
        ]);
    });

    it('should error if config file does not exist', async () => {
        getConfigFileMock.mockImplementation(() => {
            throw new Error();
        });
        await expect(
            async () =>
                await getFormatArguments(workspaceRoot, projectRoot, options)
        ).rejects.toThrowError();
    });
});
