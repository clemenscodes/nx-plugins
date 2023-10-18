import type { FileData, RawProjectGraphDependency } from '@nx/devkit';
import { CProjectType, type FilteredProject } from '@/config';
import { DependencyType } from '@nx/devkit';
import { filterDependenciesOfProject } from './filterDependenciesOfProject';
import * as getGccDependenciesModule from './getGccDependencies/getGccDependencies';

describe('filterDependenciesOfProject', () => {
    let project: FilteredProject;
    let libsDir: string;
    let projects: FilteredProject[];
    let filesToProcess: FileData[];
    let expectedProjectDependencies: RawProjectGraphDependency[];
    let getGccDependenciesMock: jest.SpyInstance;

    beforeEach(() => {
        project = {
            name: 'testparser',
            root: 'packages/parser/test',
            type: CProjectType.Test,
            tag: 'c',
            sourceRoot: 'packages/parser/test/src',
        };
        libsDir = 'packages';
        projects = [
            {
                name: 'testparser',
                root: 'packages/parser/test',
                type: CProjectType.Test,
                tag: 'c',
                sourceRoot: 'packages/parser/test/src',
            },
            {
                name: 'libparser',
                root: 'packages/parser',
                type: CProjectType.Lib,
                tag: 'c',
                sourceRoot: 'packages/parser/src',
            },
            {
                name: 'parser',
                root: 'bin/parser',
                type: CProjectType.App,
                tag: 'c',
                sourceRoot: 'bin/parser/src',
            },
        ];
        filesToProcess = [
            {
                file: 'packages/parser/test/CMakeLists.txt',
                hash: '9995994963779964934',
            },
            {
                file: 'packages/parser/test/README.md',
                hash: '13416536286541011897',
            },
            {
                file: 'packages/parser/test/include/testparser.h',
                hash: '9147925740844481238',
            },
            {
                file: 'packages/parser/test/project.json',
                hash: '5417711354427011653',
            },
            {
                file: 'packages/parser/test/src/testparser.c',
                hash: '2754802812570811200',
            },
        ];
        expectedProjectDependencies = [
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/include/testparser.h',
                type: DependencyType.static,
            },
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/src/testparser.c',
                type: DependencyType.static,
            },
        ];
        getGccDependenciesMock = jest.spyOn(
            getGccDependenciesModule,
            'getGccDependencies',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should filter dependencies of project', () => {
        getGccDependenciesMock.mockReturnValueOnce(
            'testparser.o: packages/parser/test/include/testparser.h \\\n' +
                ' include/libcmocka.h dist/packages/cmocka/cmocka-src/include/cmocka.h \\\n' +
                ' packages/parser/include/libparser.h\n',
        );
        getGccDependenciesMock.mockReturnValueOnce(
            'testparser.o: packages/parser/test/src/testparser.c \\\n' +
                ' packages/parser/test/include/testparser.h include/libcmocka.h \\\n' +
                ' dist/packages/cmocka/cmocka-src/include/cmocka.h \\\n' +
                ' packages/parser/include/libparser.h\n',
        );
        const result = filterDependenciesOfProject(
            project,
            libsDir,
            projects,
            filesToProcess,
        );
        expect(result).toStrictEqual(expectedProjectDependencies);
    });
});
