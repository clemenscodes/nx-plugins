import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { addLibProjectConfig } from './addLibProjectConfig';
import { LibGeneratorSchema } from '../../schema';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';

describe('addLibProjectConfig', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should create a C++ library project.json', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        const expected = {
            name: 'libtest',
            root: 'packages/test',
            $schema: '../../node_modules/nx/schemas/project-schema.json',
            projectType: 'library',
            sourceRoot: 'packages/test/src',
            tags: ['cpp'],
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
            },
        };

        addLibProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.libName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expected);
        expect(tree.exists(projectFilePath));
    });
    it('should create a C library project.json', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        const expected = {
            name: 'libtest',
            root: 'packages/test',
            $schema: '../../node_modules/nx/schemas/project-schema.json',
            projectType: 'library',
            sourceRoot: 'packages/test/src',
            tags: ['c'],
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
            },
        };

        addLibProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.libName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expected);
        expect(tree.exists(projectFilePath));
    });
});
