import { filterTags } from './filterTags';

describe('filterTags', () => {
    it('should filter "c" and "cpp" tags', () => {
        const tags = ['c', 'cpp', 'java', 'python'];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags = ['c', 'cpp'];
        expect(filteredTags).toEqual(expectedFilteredTags);
    });

    it('should handle an empty input array', () => {
        const tags: string[] = [];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags: string[] = [];
        expect(filteredTags).toEqual(expectedFilteredTags);
    });

    it('should handle an array with no "c" or "cpp" tags', () => {
        const tags = ['java', 'python'];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags: string[] = [];
        expect(filteredTags).toEqual(expectedFilteredTags);
    });
});
