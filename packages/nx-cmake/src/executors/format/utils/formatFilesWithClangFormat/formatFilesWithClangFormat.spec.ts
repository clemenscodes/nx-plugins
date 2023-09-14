import type { FormatExecutorSchema } from '../../schema';
import { formatFilesWithClangFormat } from './formatFilesWithClangFormat';

import * as commandExistsModule from '../../../../utils/commandUtils/commandExists/commandExists';
import * as getClangFormatFileModule from './../getClangFormatFile/getClangFormatFile';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';

describe('formatFilesWithClangFormat', () => {
    let workspaceRoot: string;
    let workspaceRootClangFormatFile: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;
    let commandExistsMock: jest.SpyInstance;
    let getClangFormatFileMock: jest.SpyInstance;
    let runCommandMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        workspaceRootClangFormatFile = `${workspaceRoot}/.clang-format`;
        projectRoot = 'project';
        options = {
            args: [],
        };

        commandExistsMock = jest.spyOn(commandExistsModule, 'commandExists');
        getClangFormatFileMock = jest.spyOn(
            getClangFormatFileModule,
            'getClangFormatFile'
        );
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        commandExistsMock.mockReturnValueOnce(true);
        getClangFormatFileMock.mockReturnValueOnce(
            workspaceRootClangFormatFile
        );
        runCommandMock.mockReturnValueOnce({ success: true });
    });

    afterEach(() => {
        commandExistsMock.mockRestore();
        getClangFormatFileMock.mockRestore();
        runCommandMock.mockRestore();
    });

    it('should format files with clang format', async () => {
        await formatFilesWithClangFormat(workspaceRoot, projectRoot, options);
        expect(runCommandMock).toBeCalledWith(
            'clang-format',
            '--style=file:"/workspace/.clang-format"',
            '/workspace/project/src/libparser.c'
        );
    });
});
