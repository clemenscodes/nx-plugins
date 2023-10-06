import type { WorkspaceLayout } from '@/types';

export const getCmockaInclude = (workspaceLayout: WorkspaceLayout): string => {
    const { libsDir } = workspaceLayout;
    const cmockaInclude = `dist/${libsDir}/cmocka/cmocka-src/include`;
    return cmockaInclude;
};
