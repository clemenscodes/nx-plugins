import { getCmakeBuildPathArgument } from './getCmakeBuildPathArgument';

describe('getCmakeBuildPathArgument', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let expectedBuildPathArgument: string;

    beforeEach(() => {
        workspaceRoot = '/root';
        projectRoot = '/projectRoot';
        expectedBuildPathArgument = `/root/dist/projectRoot`;
    });

    it('should get cmake build path argument', () => {
        const buildPathArgument = getCmakeBuildPathArgument(
            workspaceRoot,
            projectRoot,
        );
        expect(buildPathArgument).toStrictEqual(expectedBuildPathArgument);
    });
});
