import { BaseOptions } from './../../../models/base';
import { resolveOptions } from './resolveOptions';

describe('resolveOptions', () => {
    it('should resolve options correctly', () => {
        const inputOptions: BaseOptions = {
            name: 'exampleName',
            language: 'C++',
            skipFormat: false,
        };

        const expected: Required<BaseOptions> = {
            ...inputOptions,
            relativeRootPath: '../../',
            constantName: 'EXAMPLE_NAME',
            languageExtension: 'cpp',
            cmakeC: 'CXX',
        };

        const result = resolveOptions(inputOptions);

        expect(result).toEqual(expected);
    });

    it('should resolve options correctly', () => {
        const inputOptions: BaseOptions = {
            name: 'exampleName',
            language: 'C',
            skipFormat: false,
        };

        const expected: Required<BaseOptions> = {
            ...inputOptions,
            relativeRootPath: '../../',
            constantName: 'EXAMPLE_NAME',
            languageExtension: 'c',
            cmakeC: 'C',
        };

        const result = resolveOptions(inputOptions);

        expect(result).toEqual(expected);
    });
});
