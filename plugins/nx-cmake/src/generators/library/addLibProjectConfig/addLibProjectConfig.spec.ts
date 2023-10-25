import type { ProjectConfiguration, Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { addLibProjectConfig } from './addLibProjectConfig';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { LibGeneratorSchema, LibSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import initGenerator from '../../init/initGenerator';
import { setupWorkspace } from '@/mocks';

describe('addLibProjectConfig', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let resolvedOptions: LibSchema;
    let expectedProjectConfiguration: ProjectConfiguration;

    beforeEach(async () => {
        tree = setupWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            generateTests: false,
        };
        await initGenerator(tree, getDefaultInitGeneratorOptions());
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
                compile: {
                    executor: 'nx-cmake:compile',
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
                    executor: 'nx-cmake:fmt',
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
