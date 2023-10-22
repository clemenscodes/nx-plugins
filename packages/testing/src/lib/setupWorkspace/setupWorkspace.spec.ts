import { setupWorkspace } from './setupWorkspace';

describe('setupWorkspace', () => {
    it('should setup a default workspace', async () => {
        const tree = await setupWorkspace();
        expect(tree.root).toBe('/virtual');
    });
});
