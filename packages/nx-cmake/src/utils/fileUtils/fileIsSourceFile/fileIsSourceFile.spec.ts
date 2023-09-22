import { CProjectType } from '../../../models/types';
import { fileIsSourceFile } from './fileIsSourceFile';

describe('fileIsSourceFile', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectType: CProjectType;
    let file: string;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        projectType = CProjectType.App;
        file = `${workspaceRoot}/${projectRoot}/sourceFile.cpp`;
    });

    it('should return true if file is a source file', () => {
        const result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(true);
    });

    it('should return true if file is a header file', () => {
        file = `${workspaceRoot}/${projectRoot}/sourceFile.hpp`;
        let result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(true);
        file = `${workspaceRoot}/${projectRoot}/sourceFile.h`;
        result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(true);
    });

    it('should return false if file is neither a header file nor a source file', () => {
        file = `${workspaceRoot}/${projectRoot}/CMakeLists.txt`;
        const result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(false);
    });

    it('should return false if file is a sourcefile and part of a test project but not from a test project', () => {
        file = `${workspaceRoot}/${projectRoot}/test/test.cpp`;
        const result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(false);
    });

    it('should return true if file is a sourcefile and part of a test project and from a test project', () => {
        file = `${workspaceRoot}/${projectRoot}/test/test.cpp`;
        projectType = CProjectType.Test;
        const result = fileIsSourceFile(
            workspaceRoot,
            projectRoot,
            projectType,
            file,
        );
        expect(result).toBe(true);
    });
});
