import type { ProjectConfiguration, Tree } from '@nx/devkit';
import { addBinProject } from './addBinProject';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';
import { readProjectConfiguration } from '@nx/devkit';
import { BinGeneratorSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import initGenerator from '../../init/initGenerator';
import { setupWorkspace } from '@/mocks';

describe('addBinProject', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;
    let expected: ProjectConfiguration;

    beforeEach(async () => {
        tree = setupWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
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
                'nx-cmake:cmake': {
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                'nx-cmake:compile': {
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                'nx-cmake:lint': {
                    defaultConfiguration: 'local',
                    configurations: {
                        local: { args: [] },
                        ci: {
                            args: ['--warnings-as-errors=*'],
                        },
                    },
                },
                'nx-cmake:fmt': {
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
                'nx-cmake:debug': {
                    defaultConfiguration: 'debug',
                    configurations: {
                        debug: { release: false, args: [] },
                        release: { release: true, args: [] },
                    },
                },
                'nx-cmake:execute': {
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
