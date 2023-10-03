import type { WorkspaceLayout } from '../../../../models/types';
import { getGtestInclude } from './getGtestInclude';

describe('getGtestInclude', () => {
    it('should return the gtest include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGtestInclude(workspaceLayout);
        expect(result).toBe(
            'dist/libs/gtest/googletest-src/googletest/include',
        );
    });
});
