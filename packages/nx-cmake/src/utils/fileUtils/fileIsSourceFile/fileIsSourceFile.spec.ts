import { fileIsSourceFile } from './fileIsSourceFile';

describe('fileIsSourceFile', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let file: string;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = 'projectRoot';
        file = `${workspaceRoot}/${projectRoot}/sourceFile.cpp`;
    });

    it('should return true if file is a source file', () => {
        const result = fileIsSourceFile(file);
        expect(result).toBe(true);
    });

    it('should return true if file is a header file', () => {
        file = `${workspaceRoot}/${projectRoot}/sourceFile.hpp`;
        let result = fileIsSourceFile(file);
        expect(result).toBe(true);
        file = `${workspaceRoot}/${projectRoot}/sourceFile.h`;
        result = fileIsSourceFile(file);
        expect(result).toBe(true);
    });

    it('should return false if file is neither a header file nor a source file', () => {
        file = `${workspaceRoot}/${projectRoot}/CMakeLists.txt`;
        const result = fileIsSourceFile(file);
        expect(result).toBe(false);
    });
});
