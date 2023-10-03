import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { BinGeneratorSchema } from '../../schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addBinProject } from './addBinProject';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';
import { readProjectConfiguration } from '@nx/devkit';

describe('addBinProject', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;
    let expected: ProjectConfiguration;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            generateTests: false,
        };
        expected = {
            name: 'test',
            root: 'bin/test',
            $schema: '../../node_modules/nx/schemas/project-schema.json',
            projectType: 'application',
            sourceRoot: 'bin/test/src',
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
                debug: {
                    executor: 'nx-cmake:debug',
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                execute: {
                    executor: 'nx-cmake:execute',
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
            },
        } as ProjectConfiguration;
    });

    const defaultTest = () => {
        const resolvedOptions = resolveBinOptions(options);
        const { name, projectRoot } = resolvedOptions;
        const projectFilePath = `${projectRoot}/project.json`;
        addBinProject(tree, resolvedOptions);
        const result = readProjectConfiguration(tree, name);
        expect(tree.exists(projectFilePath));
        expect(result).toStrictEqual(expected);
    };

    it('should create a C++ binary project.json', defaultTest);

    it('should create a C binary project.json', () => {
        options.language = 'C';
        expected.tags = ['c'];
        defaultTest();
    });
});
