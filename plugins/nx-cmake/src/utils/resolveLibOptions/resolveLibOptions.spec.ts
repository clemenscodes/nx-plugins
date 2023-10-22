import { LibGeneratorSchema, LibSchema } from '../../generators/generator';
import { resolveLibOptions } from './resolveLibOptions';

describe('resolveLibOptions', () => {
    let options: LibGeneratorSchema;
    let expectedOptions: LibSchema;

    beforeEach(() => {
        options = {
            name: 'base',
            language: 'C',
            generateTests: false,
        };
        expectedOptions = {
            ...options,
            constantName: 'BASE',
            snakeCaseName: 'base',
            snakeCaseLibName: 'libbase',
            snakeCaseProjectName: 'base',
            camelCaseProjectName: 'base',
            camelCaseName: 'base',
            className: 'Base',
            workspaceName: 'workspace',
            cmakeConfigDir: '.cmake',
            languageExtension: 'c',
            relativeRootPath: '../../',
            appsDir: 'bin',
            libsDir: 'packages',
            cmakeC: 'C',
            testLib: 'cmocka',
            testName: 'testbase',
            libName: 'libbase',
            projectRoot: 'packages/base',
        };
    });

    it('should resolve options correctly when generateTests is false and language is C', () => {
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is true and language is C', () => {
        options.generateTests = true;
        expectedOptions.generateTests = true;
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is false and language is C++', () => {
        options.language = 'C++';
        expectedOptions.language = 'C++';
        expectedOptions.languageExtension = 'cpp';
        expectedOptions.cmakeC = 'CXX';
        expectedOptions.testLib = 'gtest';
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is true and language is C++', () => {
        options.language = 'C++';
        options.generateTests = true;
        expectedOptions.language = 'C++';
        expectedOptions.generateTests = true;
        expectedOptions.languageExtension = 'cpp';
        expectedOptions.cmakeC = 'CXX';
        expectedOptions.testLib = 'gtest';
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });
});
