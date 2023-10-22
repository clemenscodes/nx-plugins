import type { ProjectConfiguration, Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addTestProjectConfig } from './addTestProjectConfig';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import * as devkit from '@nx/devkit';
import {
    LibGeneratorSchema,
    LibSchema,
    getDefaultInitGeneratorOptions,
} from '../../config';
import initGenerator from '../../generators/init/initGenerator';

describe('addTestProjectConfig', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let resolvedOptions: LibSchema;
    let expectedProjectConfiguration: ProjectConfiguration;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C',
            generateTests: true,
        };
        resolvedOptions = resolveLibOptions(options);
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        expectedProjectConfiguration = {
            name: 'testtest',
            root: 'bin/testtest',
            $schema: '../../node_modules/nx/schemas/project-schema.json',
            projectType: 'application',
            sourceRoot: 'bin/testtest/src',
            tags: ['c', 'test'],
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
                test: {
                    executor: 'nx-cmake:test',
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
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
            readProjectConfiguration(tree, resolvedOptions.testName),
        ).toThrow("Cannot find configuration for 'testtest'");
    });
});
