import type { BinGeneratorSchema, BinSchema } from '../../schema';
import { resolveBinOptions } from './resolveBinOptions';

describe('resolveBinOptions ', () => {
    let options: BinGeneratorSchema;
    let expected: BinSchema;

    beforeEach(() => {
        options = {
            name: 'base',
            language: 'C++',
            generateTests: false,
        };

        expected = {
            ...options,
            constantName: 'BASE',
            snakeCaseName: 'base',
            camelCaseName: 'base',
            languageExtension: 'cpp',
            relativeRootPath: '../../',
            cmakeC: 'CXX',
            projectRoot: 'bin/base',
            linkOptions: {
                source: 'base',
                target: 'libbase',
                link: 'shared',
            },
        };
    });

    const defaultTest = () => {
        const result = resolveBinOptions(options);
        expect(result).toStrictEqual(expected);
    };

    it('should resolve default binary options', defaultTest);

    it('should resolve binary options when language is C', () => {
        options.language = 'C';
        options.generateTests = true;
        expected.language = 'C';
        expected.generateTests = true;
        expected.languageExtension = 'c';
        expected.cmakeC = 'C';
        expected.projectRoot = 'bin/base';
        defaultTest();
    });
});
