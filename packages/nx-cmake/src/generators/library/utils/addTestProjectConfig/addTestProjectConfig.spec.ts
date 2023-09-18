import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibOptions } from '../../schema';
import { readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addTestProjectConfig } from './addTestProjectConfig';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';

describe('addTestProjectConfig', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let resolvedOptions: LibOptions;
    let expectedProjectConfiguration: ProjectConfiguration;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C',
            skipFormat: false,
            generateTests: true,
        };
        resolvedOptions = resolveLibOptions(options);
        expectedProjectConfiguration = {
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
        } as ProjectConfiguration;
    });

    it('should create a C test project.json', async () => {
        addTestProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.testName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expectedProjectConfiguration);
        expect(tree.exists(projectFilePath));
    });

    it('should create a C++ test project.json', async () => {
        options.language = 'C++';
        resolvedOptions = resolveLibOptions(options);
        expectedProjectConfiguration.tags = ['cpp', 'test'];
        addTestProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.testName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expectedProjectConfiguration);
        expect(tree.exists(projectFilePath));
    });

    it('should not create a test project.json if generateTests = false', async () => {
        options.language = 'C++';
        options.generateTests = false;
        resolvedOptions = resolveLibOptions(options);
        addTestProjectConfig(tree, resolvedOptions);
        expect(() =>
            readProjectConfiguration(tree, resolvedOptions.testName)
        ).toThrow("Cannot find configuration for 'testtest'");
    });
});
