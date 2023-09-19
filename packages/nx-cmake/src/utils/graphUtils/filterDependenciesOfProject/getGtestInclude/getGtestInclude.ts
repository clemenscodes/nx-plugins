import type { WorkspaceLayout } from '../../../../models/types';

export const getGtestInclude = (workspaceLayout: WorkspaceLayout): string => {
    const { libsDir } = workspaceLayout;
    const gtestInclude = `dist/${libsDir}/gtest/googletest-src/googletest/include`;
    return gtestInclude;
};
