import type { FilteredProject, WorkspaceLayout } from '../../../models/types';
import {
    getFileName,
    getGtestInclude,
    getCmockaInclude,
    detectTestFramework,
    messageIncludesGtest,
    messageIncludesCmocka,
    getWorkspaceIncludeDir,
    getGccDependenciesCommand,
    getGccDependencies,
    installTestFramework,
    filterDependenciesOfProject,
} from './filterDependenciesOfProject';
import * as executeCommandModule from '../../commandUtils/executeCommand/executeCommand';
import * as filterDependenciesOfProjectModule from './filterDependenciesOfProject';
import * as runCommandModule from '../../commandUtils/runCommand/runCommand';
import {
    ProjectGraphDependencyWithFile,
    type CreateDependenciesContext,
    DependencyType,
} from '@nx/devkit';

describe('getWorkspaceIncludeDir', () => {
    it('should return the workspace include directory', () => {
        const result = getWorkspaceIncludeDir();
        expect(result).toBe('include');
    });
});

describe('messageIncludesGtest', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(messageIncludesGtest(message)).toBe(true);
    });

    it('should return false if message does not include gtest', () => {
        const message = 'Some other message';
        expect(messageIncludesGtest(message)).toBe(false);
    });
});

describe('messageIncludesCmocka', () => {
    it('should return true if message includes cmocka', () => {
        const message = '#include <cmocka.h>';
        expect(messageIncludesCmocka(message)).toBe(true);
    });

    it('should return false if message does not include cmocka', () => {
        const message = 'Some other message';
        expect(messageIncludesCmocka(message)).toBe(false);
    });
});

describe('detectTestFramework', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return true if message includes cmocka', () => {
        const message = '#include <cmocka.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return false if message does not include gtest or cmocka', () => {
        const message = 'Some other message';
        expect(detectTestFramework(message)).toBe(false);
    });
});

describe('getGtestInclude', () => {
    it('should return the gtest include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGtestInclude(workspaceLayout);
        expect(result).toBe(
            'dist/libs/gtest/googletest-src/googletest/include'
        );
    });
});

describe('getCmockaInclude', () => {
    it('should return the cmocka include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getCmockaInclude(workspaceLayout);
        expect(result).toBe('dist/libs/cmocka/cmocka-src/include');
    });
});

describe('getGccDependenciesCommand', () => {
    it('should generate the correct gcc dependency command', () => {
        const fileName = 'testfile.c';
        const projectRoot = 'projectA';
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout
        );
        const expectedCmd = `gcc -M ${fileName} -I projectA/include -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});

describe('getFileName', () => {
    it('should generate the correct file name', () => {
        const projectRoot = 'projectA';
        const name = 'testfile';
        const tag = 'c';
        const result = getFileName(projectRoot, name, tag);
        expect(result).toBe('projectA/src/testfile.c');
    });
});

describe('installTestFramework', () => {
    let runCommandSpy: jest.SpyInstance;
    let executeCommandSpy: jest.SpyInstance;

    beforeEach(() => {
        runCommandSpy = jest.spyOn(runCommandModule, 'runCommand');
        executeCommandSpy = jest.spyOn(executeCommandModule, 'executeCommand');
    });

    afterEach(() => {
        runCommandSpy.mockRestore();
        executeCommandSpy.mockRestore();
    });

    it('should install the test framework and return stdout', () => {
        const workspaceRoot = '/workspace/root';
        const projectRoot = 'project-root';
        const cmd = 'test-command';
        runCommandSpy.mockReturnValue('');
        executeCommandSpy.mockReturnValue('Some output');
        const result = installTestFramework(workspaceRoot, projectRoot, cmd);
        expect(result).toBe('Some output');
        expect(runCommandSpy).toHaveBeenCalledWith(
            'cmake',
            '-S',
            '/workspace/root/project-root',
            '/workspace/root/dist/project-root'
        );
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
    });

    it('should throw an error if stdout is empty', () => {
        const workspaceRoot = '/workspace/root';
        const projectRoot = 'project-root';
        const cmd = 'test-command';
        runCommandSpy.mockReturnValue('');
        executeCommandSpy.mockReturnValue('');
        expect(() =>
            installTestFramework(workspaceRoot, projectRoot, cmd)
        ).toThrowError('Failed process dependencies');
    });
});

describe('getGccDependencies', () => {
    let executeCommandSpy: jest.SpyInstance;
    let detectTestFrameworkSpy: jest.SpyInstance;
    let installTestFrameworkSpy: jest.SpyInstance;

    beforeEach(() => {
        executeCommandSpy = jest.spyOn(executeCommandModule, 'executeCommand');
        detectTestFrameworkSpy = jest.spyOn(
            filterDependenciesOfProjectModule,
            'detectTestFramework'
        );
        installTestFrameworkSpy = jest.spyOn(
            filterDependenciesOfProjectModule,
            'installTestFramework'
        );
    });

    afterEach(() => {
        executeCommandSpy.mockRestore();
        detectTestFrameworkSpy.mockRestore();
        installTestFrameworkSpy.mockRestore();
    });

    it('should return GCC dependencies if no test framework detected', () => {
        const cmd = 'gcc-command';
        const projectRoot = 'project-root';
        const workspaceRoot = '/workspace/root';
        executeCommandSpy.mockReturnValue('Some output');
        detectTestFrameworkSpy.mockReturnValue(false);
        const result = getGccDependencies(cmd, projectRoot, workspaceRoot);
        expect(result).toBe('Some output');
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(installTestFrameworkSpy).not.toHaveBeenCalled();
    });

    it('should install test framework and return stdout if test framework detected', () => {
        const cmd = 'gcc-command';
        const projectRoot = 'project-root';
        const workspaceRoot = '/workspace/root';
        executeCommandSpy.mockImplementation(() => {
            throw new Error('Some error');
        });
        detectTestFrameworkSpy.mockReturnValue(true);
        installTestFrameworkSpy.mockReturnValue('Test framework output');
        const result = getGccDependencies(cmd, projectRoot, workspaceRoot);
        expect(result).toBe('Test framework output');
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(detectTestFrameworkSpy).toHaveBeenCalledWith('Some error');
        expect(installTestFrameworkSpy).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            cmd
        );
    });
});

describe('filterDependenciesOfProject', () => {
    const ctx: CreateDependenciesContext = {
        fileMap: {
            'libnx-cmake-test': [
                {
                    file: 'packages/nx-cmake-test/CMakeLists.txt',
                    hash: '829231685150609454',
                },
                {
                    file: 'packages/nx-cmake-test/include/libnx-cmake-test.h',
                    hash: '7036340064984088729',
                },
                {
                    file: 'packages/nx-cmake-test/project.json',
                    hash: '13915495002580077292',
                },
                {
                    file: 'packages/nx-cmake-test/src/libnx-cmake-test.c',
                    hash: '4318600325787701056',
                },
            ],
            'nx-cmake-test': [
                {
                    file: 'nx-cmake-test/CMakeLists.txt',
                    hash: '15688613539306781857',
                },
                {
                    file: 'nx-cmake-test/include/nx-cmake-test.h',
                    hash: '17901624547898539879',
                },
                {
                    file: 'nx-cmake-test/project.json',
                    hash: '15328991193451229361',
                },
                {
                    file: 'nx-cmake-test/src/nx-cmake-test.c',
                    hash: '2517855479433356054',
                },
            ],
            'testnx-cmake-test': [
                {
                    file: 'packages/nx-cmake-test/test/CMakeLists.txt',
                    hash: '17634980793772018971',
                },
                {
                    file: 'packages/nx-cmake-test/test/include/testnx-cmake-test.h',
                    hash: '15375799923284101908',
                },
                {
                    file: 'packages/nx-cmake-test/test/project.json',
                    hash: '14354968753016061528',
                },
                {
                    file: 'packages/nx-cmake-test/test/src/testnx-cmake-test.c',
                    hash: '17933482601772038474',
                },
            ],
        },
    } as unknown as CreateDependenciesContext;

    const projects: FilteredProject[] = [
        {
            name: 'testnx-cmake-test',
            root: 'packages/nx-cmake-test/test',
            type: 'app',
            tag: 'c',
        },
        {
            name: 'libnx-cmake-test',
            root: 'packages/nx-cmake-test',
            type: 'lib',
            tag: 'c',
        },
        {
            name: 'nx-cmake-test',
            root: 'nx-cmake-test',
            type: 'app',
            tag: 'c',
        },
    ];

    const workspaceLayout: WorkspaceLayout = {
        appsDir: 'bin',
        libsDir: 'packages',
        projectNameAndRootFormat: 'as-provided',
    };

    it('should return filtered test dependencies', () => {
        const getGccDependenciesMock = jest
            .spyOn(filterDependenciesOfProjectModule, 'getGccDependencies')
            .mockReturnValue(
                'testnx-cmake-test.o: packages/nx-cmake-test/test/src/testnx-cmake-test.c \\\n' +
                    ' /usr/include/stdc-predef.h \\\n' +
                    ' packages/nx-cmake-test/test/include/testnx-cmake-test.h \\\n' +
                    ' include/libcmocka.h \\\n' +
                    ' /usr/lib/gcc/x86_64-pc-linux-gnu/13.2.1/include/stdint.h \\\n' +
                    ' /usr/include/stdint.h /usr/include/bits/libc-header-start.h \\\n' +
                    ' /usr/include/features.h /usr/include/features-time64.h \\\n' +
                    ' /usr/include/bits/wordsize.h /usr/include/bits/timesize.h \\\n' +
                    ' /usr/include/sys/cdefs.h /usr/include/bits/long-double.h \\\n' +
                    ' /usr/include/gnu/stubs.h /usr/include/gnu/stubs-64.h \\\n' +
                    ' /usr/include/bits/types.h /usr/include/bits/typesizes.h \\\n' +
                    ' /usr/include/bits/time64.h /usr/include/bits/wchar.h \\\n' +
                    ' /usr/include/bits/stdint-intn.h /usr/include/bits/stdint-uintn.h \\\n' +
                    ' /usr/lib/gcc/x86_64-pc-linux-gnu/13.2.1/include/stdarg.h \\\n' +
                    ' /usr/lib/gcc/x86_64-pc-linux-gnu/13.2.1/include/stddef.h \\\n' +
                    ' /usr/include/setjmp.h /usr/include/bits/setjmp.h \\\n' +
                    ' /usr/include/bits/types/struct___jmp_buf_tag.h \\\n' +
                    ' /usr/include/bits/types/__sigset_t.h \\\n' +
                    ' dist/packages/cmocka/cmocka-src/include/cmocka.h \\\n' +
                    ' packages/nx-cmake-test/include/libnx-cmake-test.h\n'
            );

        const result = filterDependenciesOfProject(
            projects[0],
            workspaceLayout,
            ctx,
            projects
        );

        const expected: ProjectGraphDependencyWithFile[] = [
            {
                source: 'testnx-cmake-test',
                target: 'libnx-cmake-test',
                sourceFile: 'packages/nx-cmake-test/include/libnx-cmake-test.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testnx-cmake-test',
                target: 'libnx-cmake-test',
                sourceFile: 'packages/nx-cmake-test/src/libnx-cmake-test.c',
                dependencyType: DependencyType.static,
            },
        ];
        expect(result).toStrictEqual(expected);
        getGccDependenciesMock.mockRestore();
    });

    it('should return filtered lib dependencies', () => {
        const getGccDependenciesMock = jest
            .spyOn(filterDependenciesOfProjectModule, 'getGccDependencies')
            .mockReturnValue(
                'libnx-cmake-test.o: packages/nx-cmake-test/src/libnx-cmake-test.c \\\n' +
                    ' /usr/include/stdc-predef.h \\\n' +
                    ' packages/nx-cmake-test/include/libnx-cmake-test.h\n'
            );

        const result = filterDependenciesOfProject(
            projects[1],
            workspaceLayout,
            ctx,
            projects
        );

        const expected: ProjectGraphDependencyWithFile[] = [];
        expect(result).toStrictEqual(expected);
        getGccDependenciesMock.mockRestore();
    });

    it('should return filtered bin dependencies', () => {
        const getGccDependenciesMock = jest
            .spyOn(filterDependenciesOfProjectModule, 'getGccDependencies')
            .mockReturnValue(
                'nx-cmake-test.o: nx-cmake-test/src/nx-cmake-test.c \\\n' +
                    ' /usr/include/stdc-predef.h nx-cmake-test/include/nx-cmake-test.h \\\n' +
                    ' packages/nx-cmake-test/include/libnx-cmake-test.h\n'
            );

        const result = filterDependenciesOfProject(
            projects[2],
            workspaceLayout,
            ctx,
            projects
        );

        const expected: ProjectGraphDependencyWithFile[] = [
            {
                source: 'nx-cmake-test',
                target: 'libnx-cmake-test',
                sourceFile: 'packages/nx-cmake-test/include/libnx-cmake-test.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'nx-cmake-test',
                target: 'libnx-cmake-test',
                sourceFile: 'packages/nx-cmake-test/src/libnx-cmake-test.c',
                dependencyType: DependencyType.static,
            },
        ];

        expect(result).toStrictEqual(expected);
        getGccDependenciesMock.mockRestore();
    });
});
