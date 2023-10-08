import { join } from 'path';

export const getTestDirArgument = (
    workspaceRoot: string,
    projectRoot: string,
) => {
    const testDir = join(workspaceRoot, 'dist', projectRoot);
    const testDirArgument = `--test-dir=${testDir}`;
    return testDirArgument;
};
