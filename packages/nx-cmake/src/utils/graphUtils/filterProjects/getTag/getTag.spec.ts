import { getTag } from './getTag';

describe('getTag', () => {
    it('should return the first "c" or "cpp" tag', () => {
        const tags = ['java', 'c', 'python', 'cpp', 'rust'];
        const tag = getTag(tags);
        expect(tag).toBe('c');
    });

    it('should return undefined if no "c" or "cpp" tag is found', () => {
        const tags = ['java', 'python', 'rust'];
        const tag = getTag(tags);
        expect(tag).toBeUndefined();
    });

    it('should handle an empty input array', () => {
        const tags: string[] = [];
        const tag = getTag(tags);
        expect(tag).toBeUndefined();
    });
});
