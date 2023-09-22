import type { BaseOptions } from './../../../models/types';
import { resolveOptions } from './resolveOptions';

describe('resolveOptions', () => {
    let options: BaseOptions;
    let expected: Required<BaseOptions>;

    beforeEach(() => {
        options = {
            name: 'exampleName',
            language: 'C++',
        };
        expected = {
            ...options,
            relativeRootPath: '../../',
            constantName: 'EXAMPLE_NAME',
            snakeCaseName: 'example_name',
            languageExtension: 'cpp',
            cmakeC: 'CXX',
        };
    });

    it('should resolve options correctly', () => {
        const result = resolveOptions(options);
        expect(result).toEqual(expected);
    });

    it('should resolve options correctly', () => {
        options.language = 'C';
        expected.language = 'C';
        expected.languageExtension = 'c';
        expected.cmakeC = 'C';
        const result = resolveOptions(options);
        expect(result).toEqual(expected);
    });
});
