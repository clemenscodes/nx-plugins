import type { FormatExecutorSchema } from '../../schema';
import { getClangFormatFile } from '../getClangFormatFile/getClangFormatFile';
import { commandExists } from '../../../../utils/commandUtils/commandExists/commandExists';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema
): Promise<boolean> => {
    const { args } = options;

    const fullProjectRoot = `${workspaceRoot}/${projectRoot}`;

    const clangFormatExists = commandExists('clang-format');

    if (!clangFormatExists) {
        throw new Error(
            `clang-format is not installed but required for this executor to run`
        );
    }

    const clangFormatFile = await getClangFormatFile(
        workspaceRoot,
        projectRoot
    );

    const clangFormatFileArgument = `--style=file:"${clangFormatFile}"`;
    const testFile = `${fullProjectRoot}/src/libparser.c`;

    // const cmd =
    //     `echo` +
    //     `${fullProjectRoot}/src/libparser.c\n` +
    //     `${fullProjectRoot}/include/libparser.h\n` +
    //     `| clang-format ` +
    //     clangFormatFileArgument;

    const { success } = runCommand(
        'clang-format',
        clangFormatFileArgument,
        testFile,
        ...args
    );
    return success;
};
