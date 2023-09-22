import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from './getFormatArguments';
import * as getStyleArgumentModule from './getStyleArgument/getStyleArgument';

describe('getFormatArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;
    let getStyleArgumentMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: ['--arg1', '--arg2'],
            verbose: true,
            editFilesInPlace: true,
        };
        getStyleArgumentMock = jest
            .spyOn(getStyleArgumentModule, 'getStyleArgument')
            .mockImplementation(async () => {
                return `--style=file:${workspaceRoot}/${projectRoot}/.clang-format`;
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

        expect(getStyleArgumentMock).toHaveBeenCalledWith(
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

        expect(getStyleArgumentMock).toHaveBeenCalledWith(
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
        getStyleArgumentMock.mockImplementation(() => {
            throw new Error();
        });
        await expect(
            async () =>
                await getFormatArguments(workspaceRoot, projectRoot, options)
        ).rejects.toThrowError();
    });
});
