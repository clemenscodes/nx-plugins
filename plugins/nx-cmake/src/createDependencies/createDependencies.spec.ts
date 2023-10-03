import type {
    CreateDependenciesContext,
    RawProjectGraphDependency,
} from '@nx/devkit';
import { DependencyType } from '@nx/devkit';
import { createDependencies } from './createDependencies';
import * as getDependenciesModule from '../utils/graphUtils/getDependencies/getDependencies';

describe('createDependencies', () => {
    let mockGetDependencies: jest.SpyInstance;
    let getDependenciesReturnMock: RawProjectGraphDependency[];
    let expectedDependencies: RawProjectGraphDependency[];
    let contextMock: CreateDependenciesContext;

    beforeEach(() => {
        mockGetDependencies = jest.spyOn(
            getDependenciesModule,
            'getDependencies',
        );

        getDependenciesReturnMock = [
            {
                source: 'testa',
                target: 'liba',
                sourceFile: 'packages/a/test/include/testa.h',
                type: DependencyType.static,
            },
            {
                source: 'testa',
                target: 'libb',
                sourceFile: 'packages/a/test/include/testa.h',
                type: DependencyType.static,
            },
            {
                source: 'testa',
                target: 'liba',
                sourceFile: 'packages/a/test/src/testa.c',
                type: DependencyType.static,
            },
            {
                source: 'testa',
                target: 'libb',
                sourceFile: 'packages/a/test/src/testa.c',
                type: DependencyType.static,
            },
            {
                source: 'testb',
                target: 'libb',
                sourceFile: 'packages/b/test/include/testb.h',
                type: DependencyType.static,
            },
            {
                source: 'testb',
                target: 'libb',
                sourceFile: 'packages/b/test/src/testb.c',
                type: DependencyType.static,
            },
            {
                source: 'liba',
                target: 'libb',
                sourceFile: 'packages/a/include/liba.h',
                type: DependencyType.static,
            },
            {
                source: 'liba',
                target: 'libb',
                sourceFile: 'packages/a/src/liba.c',
                type: DependencyType.static,
            },
            {
                source: 'b',
                target: 'libb',
                sourceFile: 'bin/b/include/b.h',
                type: DependencyType.static,
            },
            {
                source: 'b',
                target: 'libb',
                sourceFile: 'bin/b/src/b.c',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'liba',
                sourceFile: 'bin/a/include/a.h',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'libb',
                sourceFile: 'bin/a/include/a.h',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'liba',
                sourceFile: 'bin/a/src/a.c',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'libb',
                sourceFile: 'bin/a/src/a.c',
                type: DependencyType.static,
            },
        ];
        expectedDependencies = [
            {
                source: 'testa',
                target: 'liba',
                sourceFile: 'packages/a/test/include/testa.h',
                type: DependencyType.static,
            },
            {
                source: 'testa',
                target: 'liba',
                sourceFile: 'packages/a/test/src/testa.c',
                type: DependencyType.static,
            },
            {
                source: 'testb',
                target: 'libb',
                sourceFile: 'packages/b/test/include/testb.h',
                type: DependencyType.static,
            },
            {
                source: 'testb',
                target: 'libb',
                sourceFile: 'packages/b/test/src/testb.c',
                type: DependencyType.static,
            },
            {
                source: 'liba',
                target: 'libb',
                sourceFile: 'packages/a/include/liba.h',
                type: DependencyType.static,
            },
            {
                source: 'liba',
                target: 'libb',
                sourceFile: 'packages/a/src/liba.c',
                type: DependencyType.static,
            },
            {
                source: 'b',
                target: 'libb',
                sourceFile: 'bin/b/include/b.h',
                type: DependencyType.static,
            },
            {
                source: 'b',
                target: 'libb',
                sourceFile: 'bin/b/src/b.c',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'liba',
                sourceFile: 'bin/a/include/a.h',
                type: DependencyType.static,
            },
            {
                source: 'a',
                target: 'liba',
                sourceFile: 'bin/a/src/a.c',
                type: DependencyType.static,
            },
        ];
        contextMock = {
            workspaceRoot: '/workspaceRoot',
            externalNodes: {},
            projects: {
                testb: {
                    name: 'testb',
                    root: 'packages/b/test',
                    sourceRoot: 'packages/b/test/src',
                    projectType: 'application',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        test: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:test',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['test', 'c', 'test'],
                    implicitDependencies: [],
                },
                testa: {
                    name: 'testa',
                    root: 'packages/a/test',
                    sourceRoot: 'packages/a/test/src',
                    projectType: 'application',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        test: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:test',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['test', 'c', 'test'],
                    implicitDependencies: [],
                },
                liba: {
                    name: 'liba',
                    root: 'packages/a',
                    sourceRoot: 'packages/a/src',
                    projectType: 'library',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['c'],
                    implicitDependencies: [],
                },
                libb: {
                    name: 'libb',
                    root: 'packages/b',
                    sourceRoot: 'packages/b/src',
                    projectType: 'library',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['c'],
                    implicitDependencies: [],
                },
                b: {
                    name: 'b',
                    root: 'bin/b',
                    sourceRoot: 'bin/b/src',
                    projectType: 'application',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        debug: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:debug',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        execute: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:execute',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['c'],
                    implicitDependencies: [],
                },
                a: {
                    name: 'a',
                    root: 'bin/a',
                    sourceRoot: 'bin/a/src',
                    projectType: 'application',
                    targets: {
                        cmake: {
                            dependsOn: ['^cmake'],
                            inputs: ['cmake'],
                            executor: 'nx-cmake:cmake',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: {
                                    release: false,
                                    args: [],
                                },
                                production: { release: true, args: [] },
                            },
                            options: {},
                        },
                        build: {
                            dependsOn: ['^cmake', '^build', 'cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:build',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        lint: {
                            dependsOn: ['cmake'],
                            inputs: ['default'],
                            executor: 'nx-cmake:lint',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        fmt: {
                            executor: 'nx-cmake:format',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        debug: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:debug',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                        execute: {
                            dependsOn: ['build'],
                            inputs: ['default'],
                            executor: 'nx-cmake:execute',
                            defaultConfiguration: 'development',
                            configurations: {
                                development: { args: [] },
                                production: { args: [] },
                            },
                            options: {},
                        },
                    },
                    tags: ['c'],
                    implicitDependencies: [],
                },
            },
            fileMap: {
                nonProjectFiles: [],
                projectFileMap: {
                    a: [
                        {
                            file: 'bin/a/CMakeLists.txt',
                            hash: '16339308070239190717',
                        },
                        {
                            file: 'bin/a/README.md',
                            hash: '7201959146225012909',
                        },
                        {
                            file: 'bin/a/include/a.h',
                            hash: '2434746085086529834',
                        },
                        {
                            file: 'bin/a/project.json',
                            hash: '17756265566107984751',
                        },
                        { file: 'bin/a/src/a.c', hash: '7529403647042148566' },
                    ],
                    b: [
                        {
                            file: 'bin/b/CMakeLists.txt',
                            hash: '3609578026509014322',
                        },
                        {
                            file: 'bin/b/README.md',
                            hash: '6270437596575845475',
                        },
                        {
                            file: 'bin/b/include/b.h',
                            hash: '10468610324498506898',
                        },
                        {
                            file: 'bin/b/project.json',
                            hash: '13753953835978512380',
                        },
                        { file: 'bin/b/src/b.c', hash: '5593835610142892356' },
                    ],
                    liba: [
                        {
                            file: 'packages/a/CMakeLists.txt',
                            hash: '4083624665328764431',
                        },
                        {
                            file: 'packages/a/README.md',
                            hash: '5422747201678680226',
                        },
                        {
                            file: 'packages/a/include/liba.h',
                            hash: '7287129596721732577',
                        },
                        {
                            file: 'packages/a/project.json',
                            hash: '16419477992021623155',
                        },
                        {
                            file: 'packages/a/src/liba.c',
                            hash: '8811379305788001024',
                        },
                    ],
                    libb: [
                        {
                            file: 'packages/b/CMakeLists.txt',
                            hash: '10511542091814494138',
                        },
                        {
                            file: 'packages/b/README.md',
                            hash: '3291435535669935444',
                        },
                        {
                            file: 'packages/b/include/libb.h',
                            hash: '17132771858623101600',
                        },
                        {
                            file: 'packages/b/project.json',
                            hash: '8634051213554837246',
                        },
                        {
                            file: 'packages/b/src/libb.c',
                            hash: '12987999627353370998',
                        },
                    ],
                    testa: [
                        {
                            file: 'packages/a/test/CMakeLists.txt',
                            hash: '9385086644011761389',
                        },
                        {
                            file: 'packages/a/test/README.md',
                            hash: '15235861178647932845',
                        },
                        {
                            file: 'packages/a/test/include/testa.h',
                            hash: '17257690104214933380',
                        },
                        {
                            file: 'packages/a/test/project.json',
                            hash: '1432592507932287325',
                        },
                        {
                            file: 'packages/a/test/src/testa.c',
                            hash: '1495985023809063338',
                        },
                    ],
                    testb: [
                        {
                            file: 'packages/b/test/CMakeLists.txt',
                            hash: '16048227411190777847',
                        },
                        {
                            file: 'packages/b/test/README.md',
                            hash: '2870123589895563032',
                        },
                        {
                            file: 'packages/b/test/include/testb.h',
                            hash: '16909779487121674705',
                        },
                        {
                            file: 'packages/b/test/project.json',
                            hash: '16564669496220554108',
                        },
                        {
                            file: 'packages/b/test/src/testb.c',
                            hash: '5473380971657595275',
                        },
                    ],
                },
            },
            filesToProcess: {
                nonProjectFiles: [],
                projectFileMap: {
                    testb: [
                        {
                            file: 'packages/b/test/CMakeLists.txt',
                            hash: '16048227411190777847',
                        },
                        {
                            file: 'packages/b/test/README.md',
                            hash: '2870123589895563032',
                        },
                        {
                            file: 'packages/b/test/include/testb.h',
                            hash: '16909779487121674705',
                        },
                        {
                            file: 'packages/b/test/project.json',
                            hash: '13671336406555829957',
                        },
                        {
                            file: 'packages/b/test/src/testb.c',
                            hash: '5473380971657595275',
                        },
                    ],
                    testa: [
                        {
                            file: 'packages/a/test/CMakeLists.txt',
                            hash: '9385086644011761389',
                        },
                        {
                            file: 'packages/a/test/README.md',
                            hash: '15235861178647932845',
                        },
                        {
                            file: 'packages/a/test/include/testa.h',
                            hash: '17257690104214933380',
                        },
                        {
                            file: 'packages/a/test/project.json',
                            hash: '17878242666158404072',
                        },
                        {
                            file: 'packages/a/test/src/testa.c',
                            hash: '1495985023809063338',
                        },
                    ],
                    liba: [
                        {
                            file: 'packages/a/CMakeLists.txt',
                            hash: '4083624665328764431',
                        },
                        {
                            file: 'packages/a/README.md',
                            hash: '5422747201678680226',
                        },
                        {
                            file: 'packages/a/include/liba.h',
                            hash: '7287129596721732577',
                        },
                        {
                            file: 'packages/a/project.json',
                            hash: '14142598126282942392',
                        },
                        {
                            file: 'packages/a/src/liba.c',
                            hash: '8811379305788001024',
                        },
                    ],
                    libb: [
                        {
                            file: 'packages/b/CMakeLists.txt',
                            hash: '10511542091814494138',
                        },
                        {
                            file: 'packages/b/README.md',
                            hash: '3291435535669935444',
                        },
                        {
                            file: 'packages/b/include/libb.h',
                            hash: '17132771858623101600',
                        },
                        {
                            file: 'packages/b/project.json',
                            hash: '14475440475738848143',
                        },
                        {
                            file: 'packages/b/src/libb.c',
                            hash: '12987999627353370998',
                        },
                    ],
                    b: [
                        {
                            file: 'bin/b/CMakeLists.txt',
                            hash: '3609578026509014322',
                        },
                        {
                            file: 'bin/b/README.md',
                            hash: '6270437596575845475',
                        },
                        {
                            file: 'bin/b/include/b.h',
                            hash: '10468610324498506898',
                        },
                        {
                            file: 'bin/b/project.json',
                            hash: '16586497158741074059',
                        },
                        { file: 'bin/b/src/b.c', hash: '5593835610142892356' },
                    ],
                    a: [
                        {
                            file: 'bin/a/CMakeLists.txt',
                            hash: '16339308070239190717',
                        },
                        {
                            file: 'bin/a/README.md',
                            hash: '7201959146225012909',
                        },
                        {
                            file: 'bin/a/include/a.h',
                            hash: '16201899969231751559',
                        },
                        {
                            file: 'bin/a/project.json',
                            hash: '12059839721009230919',
                        },
                        { file: 'bin/a/src/a.c', hash: '7529403647042148566' },
                    ],
                },
            },
            nxJsonConfiguration: {
                tasksRunnerOptions: {},
                pluginsConfig: { '@nx/js': { analyzeSourceFiles: true } },
                extends: 'nx/presets/npm.json',
                defaultProject: 'nx-cmake',
                generators: {
                    'nx-cmake': {
                        library: { language: 'C' },
                        binary: { language: 'C' },
                    },
                },
                targetDefaults: {
                    cmake: { dependsOn: ['^cmake'], inputs: ['cmake'] },
                    build: {
                        dependsOn: ['^cmake', '^build', 'cmake'],
                        inputs: ['default'],
                    },
                    debug: { dependsOn: ['build'], inputs: ['default'] },
                    execute: { dependsOn: ['build'], inputs: ['default'] },
                    test: { dependsOn: ['build'], inputs: ['default'] },
                    lint: { dependsOn: ['cmake'], inputs: ['default'] },
                },
                namedInputs: {
                    cmake: [
                        '{projectRoot}/**/*.cpp',
                        '{projectRoot}/**/*.hpp',
                        '{projectRoot}/**/*.c',
                        '{projectRoot}/**/*.h',
                        '{projectRoot}/CMakeLists.txt',
                        '{workspaceRoot}/CMakeLists.txt',
                        '{workspaceRoot}/cmake/**/*.cmake',
                    ],
                },
                plugins: ['nx-cmake'],
                workspaceLayout: {
                    appsDir: 'bin',
                    libsDir: 'packages',
                },
            },
        };
        mockGetDependencies.mockReturnValue(getDependenciesReturnMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return dependencies based on the provided context', () => {
        const result = createDependencies(contextMock);
        expect(result).toStrictEqual(expectedDependencies);
    });
});
