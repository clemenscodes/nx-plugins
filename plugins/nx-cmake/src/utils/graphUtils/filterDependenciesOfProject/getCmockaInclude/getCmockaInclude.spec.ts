import type { WorkspaceLayout } from '../../../../models/types';
import { getCmockaInclude } from './getCmockaInclude';

describe('getCmockaInclude', () => {
    it('should return the cmocka include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getCmockaInclude(workspaceLayout);
        expect(result).toBe('dist/libs/cmocka/cmocka-src/include');
    });
});
