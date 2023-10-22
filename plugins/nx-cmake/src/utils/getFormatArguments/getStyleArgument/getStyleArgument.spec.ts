import { getStyleArgument } from './getStyleArgument';
import * as fileModule from '@/file';
import { CLANG_FORMAT_CONFIG_FILE } from '../../../config/getPrograms/getClangFormat/getClangFormat';

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
            .spyOn(fileModule, 'getConfigFile')
            .mockImplementation((workspaceRoot, projectRoot) => {
                return `${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`;
            });
    });

    it('should return the correct style argument', () => {
        const result = getStyleArgument(
            workspaceRoot,
            projectRoot,
            clangFormatFile,
        );
        expect(result).toBe(
            `--style=file:${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`,
        );
    });

    it('should return the correct style argument', () => {
        const result = getStyleArgument(
            workspaceRoot,
            projectRoot,
            clangFormatFile,
        );
        expect(result).toBe(
            `--style=file:${workspaceRoot}/${projectRoot}/${CLANG_FORMAT_CONFIG_FILE}`,
        );
    });

    it('should error if config file does not exist', () => {
        getConfigFileMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            getStyleArgument(workspaceRoot, projectRoot, '.clang-format'),
        ).toThrowError();
    });
});
