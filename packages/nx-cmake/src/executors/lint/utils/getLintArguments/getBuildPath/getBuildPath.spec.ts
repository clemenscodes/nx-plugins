import { getBuildPath } from './getBuildPath';

describe('getBuildPath', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let expectedBuildPath: string;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        expectedBuildPath = `${workspaceRoot}/dist/${projectRoot}/compile_commands.json`;
    });

    it('should return the correct build path', () => {
        const result = getBuildPath(workspaceRoot, projectRoot);
        expect(result).toBe(expectedBuildPath);
    });
});
