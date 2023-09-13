import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { addTestProjectConfig } from './addTestProjectConfig';
import { LibGeneratorSchema } from '../../schema';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';

describe('addTestProjectConfig', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should create a C test project.json', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C',
            skipFormat: false,
            generateTests: true,
        };
        const resolvedOptions = resolveLibOptions(options);
        const expected = {
            name: 'testtest',
            root: 'packages/test/test',
            $schema: '../../../node_modules/nx/schemas/project-schema.json',
            projectType: 'application',
            sourceRoot: 'packages/test/test/src',
            tags: ['c', 'test'],
            targets: {
                cmake: {
                    executor: 'nx-cmake:cmake',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { release: false, args: [] },
                        production: { release: true, args: [] },
                    },
                },
                build: {
                    executor: 'nx-cmake:build',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                lint: {
                    executor: 'nx-cmake:lint',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                fmt: {
                    executor: 'nx-cmake:format',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                test: {
                    executor: 'nx-cmake:test',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
            },
        };

        addTestProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.testName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expected);
        expect(tree.exists(projectFilePath));
    });

    it('should create a C++ test project.json', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        const resolvedOptions = resolveLibOptions(options);
        const expected = {
            name: 'testtest',
            root: 'packages/test/test',
            $schema: '../../../node_modules/nx/schemas/project-schema.json',
            projectType: 'application',
            sourceRoot: 'packages/test/test/src',
            tags: ['cpp', 'test'],
            targets: {
                cmake: {
                    executor: 'nx-cmake:cmake',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { release: false, args: [] },
                        production: { release: true, args: [] },
                    },
                },
                build: {
                    executor: 'nx-cmake:build',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                lint: {
                    executor: 'nx-cmake:lint',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                fmt: {
                    executor: 'nx-cmake:format',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                test: {
                    executor: 'nx-cmake:test',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
            },
        };

        addTestProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.testName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expected);
        expect(tree.exists(projectFilePath));
    });

    it('should not create a test project.json if generateTests = false', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        addTestProjectConfig(tree, resolvedOptions);
        expect(() =>
            readProjectConfiguration(tree, resolvedOptions.testName)
        ).toThrow("Cannot find configuration for 'testtest'");
    });
});
