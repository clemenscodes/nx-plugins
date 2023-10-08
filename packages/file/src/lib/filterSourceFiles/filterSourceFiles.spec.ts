import { filterSourceFiles } from './filterSourceFiles';

describe('filterSourceFiles', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let files: string[];

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        files = [
            `${workspaceRoot}/${projectRoot}/CMakeLists.txt`,
            `${workspaceRoot}/${projectRoot}/README.md`,
            `${workspaceRoot}/${projectRoot}/include/libparser.h`,
            `${workspaceRoot}/${projectRoot}/project.json`,
            `${workspaceRoot}/${projectRoot}/src/libparser.c`,
            `${workspaceRoot}/${projectRoot}/test/CMakeLists.txt`,
            `${workspaceRoot}/${projectRoot}/test/src/testparser.c`,
        ];
    });

    it('should filter source files correctly', () => {
        const result = filterSourceFiles(files);
        expect(result).toStrictEqual([
            `${workspaceRoot}/${projectRoot}/include/libparser.h`,
            `${workspaceRoot}/${projectRoot}/src/libparser.c`,
            `${workspaceRoot}/${projectRoot}/test/src/testparser.c`,
        ]);
    });
});
