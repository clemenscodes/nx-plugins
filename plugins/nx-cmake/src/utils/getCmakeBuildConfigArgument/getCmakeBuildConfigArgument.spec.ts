import { getCmakeBuildConfigArgument } from './getCmakeBuildConfigArgument';

describe('getCmakeBuildConfigArgument', () => {
    let release: boolean;
    let expectedBuildConfigArgument: string;

    beforeEach(() => {
        release = false;
        expectedBuildConfigArgument = `--config=Debug`;
    });

    it('should get cmake build config argument when release is false', () => {
        const buildConfigArgument = getCmakeBuildConfigArgument(release);
        expect(buildConfigArgument).toStrictEqual(expectedBuildConfigArgument);
    });

    it('should get cmake build config argument when release is true', () => {
        release = true;
        expectedBuildConfigArgument = `--config=Release`;
        const buildConfigArgument = getCmakeBuildConfigArgument(release);
        expect(buildConfigArgument).toStrictEqual(expectedBuildConfigArgument);
    });
});
