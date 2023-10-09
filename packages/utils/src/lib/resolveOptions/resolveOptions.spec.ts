import type { GeneratorBaseOptions } from '@/config';
import { resolveOptions } from './resolveOptions';

describe('resolveOptions', () => {
    let options: GeneratorBaseOptions;
    let expected: Required<GeneratorBaseOptions>;

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
            camelCaseName: 'exampleName',
            className: 'ExampleName',
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
