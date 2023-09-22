import { CProjectType } from '../../../models/types';
import { filterSourceFiles } from './filterSourceFiles';

describe('filterSourceFiles', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectType: CProjectType;
    let files: string[];

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        projectType = CProjectType.App;
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

    it('should filter source files correctly and exclude test files', () => {
        const result = filterSourceFiles(
            workspaceRoot,
            projectRoot,
            projectType,
            files,
        );
        expect(result).toStrictEqual([
            `${workspaceRoot}/${projectRoot}/include/libparser.h`,
            `${workspaceRoot}/${projectRoot}/src/libparser.c`,
        ]);
    });

    it('should filter test source files correctly', () => {
        projectType = CProjectType.Test;
        const result = filterSourceFiles(
            workspaceRoot,
            projectRoot,
            projectType,
            files,
        );
        expect(result).toStrictEqual([
            `${workspaceRoot}/${projectRoot}/test/src/testparser.c`,
        ]);
    });
});
