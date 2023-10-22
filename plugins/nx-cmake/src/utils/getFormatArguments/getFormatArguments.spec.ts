import { CLANG_FORMAT_CONFIG_FILE } from '../../config';
import { FormatExecutorSchema } from '../../executors/executor';
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
            .mockImplementation(() => {
                return `--style=file:${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`;
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return format arguments with style, verbose, and in-place edit', () => {
        const result = getFormatArguments(workspaceRoot, projectRoot, options);

        expect(getStyleArgumentMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            CLANG_FORMAT_CONFIG_FILE,
        );

        expect(result).toEqual([
            `--style=file:${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`,
            '--verbose',
            '-i',
            '--arg1',
            '--arg2',
        ]);
    });

    it('should return format arguments without verbose and in-place edit', () => {
        options.editFilesInPlace = false;

        const result = getFormatArguments(workspaceRoot, projectRoot, options);

        expect(getStyleArgumentMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            CLANG_FORMAT_CONFIG_FILE,
        );

        expect(result).toEqual([
            `--style=file:${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`,
            '--verbose',
            '--arg1',
            '--arg2',
        ]);
    });

    it('should error if config file does not exist', () => {
        getStyleArgumentMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            getFormatArguments(workspaceRoot, projectRoot, options),
        ).toThrowError();
    });
});
