import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibOptions } from '../../schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration } from '@nx/devkit';
import { addLibProjectConfig } from './addLibProjectConfig';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';

describe('addLibProjectConfig', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let resolvedOptions: LibOptions;
    let expectedProjectConfiguration: ProjectConfiguration;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        resolvedOptions = resolveLibOptions(options);
        expectedProjectConfiguration = {
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
        } as ProjectConfiguration;
    });

    it('should create a C++ library project.json', async () => {
        addLibProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.libName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expectedProjectConfiguration);
        expect(tree.exists(projectFilePath));
    });

    it('should create a C library project.json', async () => {
        options.language = 'C';
        resolvedOptions = resolveLibOptions(options);
        expectedProjectConfiguration.tags = ['c'];
        addLibProjectConfig(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, resolvedOptions.libName);
        const projectFilePath = `${tree.root}/${result.root}/project.json`;
        expect(result).toStrictEqual(expectedProjectConfiguration);
        expect(tree.exists(projectFilePath));
    });
});
