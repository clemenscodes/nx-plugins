import { getClangTidyBuildPathArgument } from './getClangTidyBuildPathArgument';

describe('getClangTidyBuildPathArgument', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let expectedArgument: string;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        expectedArgument = `-p=${workspaceRoot}/dist/${projectRoot}/compile_commands.json`;
    });

    it('should return the correct clang-tidy build path argument', () => {
        const result = getClangTidyBuildPathArgument(
            workspaceRoot,
            projectRoot
        );
        expect(result).toBe(expectedArgument);
    });
});
