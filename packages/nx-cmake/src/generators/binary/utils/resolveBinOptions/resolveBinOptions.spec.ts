import { resolveBinOptions } from './resolveBinOptions';
import { BinGeneratorSchema, BinSchema } from '../../schema';

describe('resolveBinOptions ', () => {
    let options: BinGeneratorSchema;
    let expected: BinSchema;

    beforeEach(() => {
        options = {
            name: 'base',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };

        expected = {
            ...options,
            constantName: 'BASE',
            languageExtension: 'cpp',
            relativeRootPath: '../../',
            cmakeC: 'CXX',
            projectRoot: 'base',
            linkOptions: {
                source: 'base',
                target: 'libbase',
                link: 'shared',
                skipFormat: false,
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
        defaultTest();
    });
});
