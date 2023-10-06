import type { ProjectFileMap } from '@nx/devkit';
import type { FilteredProject } from '@/types';
import { filterFilesToProcess } from './filterFilesToProcess';

describe('filterFilesToProcess', () => {
    let filesToProces: ProjectFileMap;
    let filteredProjects: FilteredProject[];
    let expectedFilteredFiles: ProjectFileMap;

    beforeEach(() => {
        filesToProces = {
            testd: [
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
            testc: [
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
                { file: 'packages/a/README.md', hash: '5422747201678680226' },
                {
                    file: 'packages/a/include/liba.h',
                    hash: '7287129596721732577',
                },
                {
                    file: 'packages/a/project.json',
                    hash: '14142598126282942392',
                },
                { file: 'packages/a/src/liba.c', hash: '8811379305788001024' },
            ],
            libb: [
                {
                    file: 'packages/b/CMakeLists.txt',
                    hash: '10511542091814494138',
                },
                { file: 'packages/b/README.md', hash: '3291435535669935444' },
                {
                    file: 'packages/b/include/libb.h',
                    hash: '17132771858623101600',
                },
                {
                    file: 'packages/b/project.json',
                    hash: '14475440475738848143',
                },
                { file: 'packages/b/src/libb.c', hash: '12987999627353370998' },
            ],
            b: [
                { file: 'bin/b/CMakeLists.txt', hash: '3609578026509014322' },
                { file: 'bin/b/README.md', hash: '6270437596575845475' },
                { file: 'bin/b/include/b.h', hash: '10468610324498506898' },
                { file: 'bin/b/project.json', hash: '16586497158741074059' },
                { file: 'bin/b/src/b.c', hash: '5593835610142892356' },
            ],
            a: [
                { file: 'bin/a/CMakeLists.txt', hash: '16339308070239190717' },
                { file: 'bin/a/README.md', hash: '7201959146225012909' },
                { file: 'bin/a/include/a.h', hash: '2434746085086529834' },
                { file: 'bin/a/project.json', hash: '12059839721009230919' },
                { file: 'bin/a/src/a.c', hash: '7529403647042148566' },
            ],
        };
        filteredProjects = [
            {
                name: 'testa',
                root: 'packages/a/test',
                type: 2,
                tag: 'c',
                sourceRoot: 'packages/a/test/src',
            },
            {
                name: 'testb',
                root: 'packages/b/test',
                type: 2,
                tag: 'c',
                sourceRoot: 'packages/b/test/src',
            },
            {
                name: 'libb',
                root: 'packages/b',
                type: 1,
                tag: 'c',
                sourceRoot: 'packages/b/src',
            },
            {
                name: 'liba',
                root: 'packages/a',
                type: 1,
                tag: 'c',
                sourceRoot: 'packages/a/src',
            },
            {
                name: 'a',
                root: 'bin/a',
                type: 0,
                tag: 'c',
                sourceRoot: 'bin/a/src',
            },
            {
                name: 'b',
                root: 'bin/b',
                type: 0,
                tag: 'c',
                sourceRoot: 'bin/b/src',
            },
        ];
        expectedFilteredFiles = {
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
                { file: 'packages/a/README.md', hash: '5422747201678680226' },
                {
                    file: 'packages/a/include/liba.h',
                    hash: '7287129596721732577',
                },
                {
                    file: 'packages/a/project.json',
                    hash: '14142598126282942392',
                },
                { file: 'packages/a/src/liba.c', hash: '8811379305788001024' },
            ],
            libb: [
                {
                    file: 'packages/b/CMakeLists.txt',
                    hash: '10511542091814494138',
                },
                { file: 'packages/b/README.md', hash: '3291435535669935444' },
                {
                    file: 'packages/b/include/libb.h',
                    hash: '17132771858623101600',
                },
                {
                    file: 'packages/b/project.json',
                    hash: '14475440475738848143',
                },
                { file: 'packages/b/src/libb.c', hash: '12987999627353370998' },
            ],
            b: [
                { file: 'bin/b/CMakeLists.txt', hash: '3609578026509014322' },
                { file: 'bin/b/README.md', hash: '6270437596575845475' },
                { file: 'bin/b/include/b.h', hash: '10468610324498506898' },
                { file: 'bin/b/project.json', hash: '16586497158741074059' },
                { file: 'bin/b/src/b.c', hash: '5593835610142892356' },
            ],
            a: [
                { file: 'bin/a/CMakeLists.txt', hash: '16339308070239190717' },
                { file: 'bin/a/README.md', hash: '7201959146225012909' },
                { file: 'bin/a/include/a.h', hash: '2434746085086529834' },
                { file: 'bin/a/project.json', hash: '12059839721009230919' },
                { file: 'bin/a/src/a.c', hash: '7529403647042148566' },
            ],
        };
    });

    it('should filter files to process', () => {
        const result = filterFilesToProcess(filesToProces, filteredProjects);
        expect(result).toStrictEqual(expectedFilteredFiles);
    });
});
