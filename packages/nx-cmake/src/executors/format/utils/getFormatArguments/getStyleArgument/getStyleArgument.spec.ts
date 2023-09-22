import { getStyleArgument } from './getStyleArgument';
import * as getConfigFileModule from '../../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getStyleArgument', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let clangFormatFile: string;
    let getConfigFileMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        clangFormatFile = '.clang-format';
        getConfigFileMock = jest
            .spyOn(getConfigFileModule, 'getConfigFile')
            .mockImplementation(async (workspaceRoot, projectRoot) => {
                return `${workspaceRoot}/${projectRoot}/.clang-format`;
            });
    });

    it('should return the correct style argument', async () => {
        const result = await getStyleArgument(
            workspaceRoot,
            projectRoot,
            clangFormatFile
        );
        expect(result).toBe(
            `--style=file:${workspaceRoot}/${projectRoot}/.clang-format`
        );
    });

    it('should return the correct style argument', async () => {
        const result = await getStyleArgument(
            workspaceRoot,
            projectRoot,
            clangFormatFile
        );
        expect(result).toBe(
            `--style=file:${workspaceRoot}/${projectRoot}/.clang-format`
        );
    });

    it('should error if config file does not exist', async () => {
        getConfigFileMock.mockImplementation(() => {
            throw new Error();
        });
        await expect(
            async () =>
                await getStyleArgument(
                    workspaceRoot,
                    projectRoot,
                    '.clang-format'
                )
        ).rejects.toThrowError();
    });
});
