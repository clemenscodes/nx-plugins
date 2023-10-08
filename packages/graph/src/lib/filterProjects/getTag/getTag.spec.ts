import { getTag } from './getTag';

describe('getTag', () => {
    it('should return the first "c" or "cpp" tag', () => {
        const tags = ['java', 'c', 'python', 'cpp', 'rust'];
        const tag = getTag(tags);
        expect(tag).toBe('c');
    });

    it('should error if no "c" or "cpp" tag is found', () => {
        expect(() => getTag(['java', 'python', 'rust'])).toThrowError(
            'No c or cpp tag was defined in project.json',
        );
    });

    it('should throw with empty input array', () => {
        expect(() => getTag([])).toThrowError(
            'No c or cpp tag was defined in project.json',
        );
    });
});
