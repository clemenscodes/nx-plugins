import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibOptions } from '@/config';
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
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                build: {
                    executor: 'nx-cmake:build',
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                lint: {
                    executor: 'nx-cmake:lint',
                    defaultConfiguration: 'local',
                    configurations: {
                        local: { args: [] },
                        ci: {
                            args: ['--warnings-as-errors=*'],
                        },
                    },
                },
                fmt: {
                    executor: 'nx-cmake:format',
                    defaultConfiguration: 'local',
                    configurations: {
                        local: {
                            args: [],
                            verbose: true,
                            editFilesInPlace: true,
                        },
                        ci: {
                            args: ['--dry-run', '--ferror-limit=0', '-Werror'],
                            editFilesInPlace: false,
                            verbose: false,
                        },
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
