import {
    ProjectConfiguration,
    readProjectConfiguration,
    type Tree,
} from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addBinProject } from './addBinProject';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';
import type { BinGeneratorSchema } from '../../schema';

describe('addBinProject', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;
    let expected: ProjectConfiguration;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        expected = {
            name: 'test',
            root: 'test',
            $schema: '../node_modules/nx/schemas/project-schema.json',
            projectType: 'application',
            sourceRoot: 'test/src',
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
                debug: {
                    executor: 'nx-cmake:debug',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
                    },
                },
                execute: {
                    executor: 'nx-cmake:execute',
                    defaultConfiguration: 'development',
                    configurations: {
                        development: { args: [] },
                        production: { args: [] },
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
