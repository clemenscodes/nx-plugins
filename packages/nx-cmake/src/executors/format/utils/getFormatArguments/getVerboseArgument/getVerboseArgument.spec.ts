import { getVerboseArgument } from './getVerboseArgument';

describe('getVerboseArgument', () => {
    let verbose: boolean;

    beforeEach(() => {
        verbose = true;
    });

    it('should return ["--verbose"] when verbose is true', () => {
        const result = getVerboseArgument(verbose);
        expect(result).toEqual(['--verbose']);
    });

    it('should return an empty array when verbose is false', () => {
        verbose = false;
        const result = getVerboseArgument(verbose);
        expect(result).toEqual([]);
    });
});
