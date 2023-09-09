import {
    buildTarget,
    cmakeTarget,
    debugTarget,
    executeTarget,
    fmtTarget,
    getProjectTargets,
    lintTarget,
    testTarget,
} from './getProjectTargets';
import { CProjectType } from '../../models/types';

describe('getProjectTargets', () => {
    it('should return correct targets for App project type', () => {
        const result = getProjectTargets(CProjectType.App);
        expect(result).toEqual({
            cmake: cmakeTarget,
            build: buildTarget,
            lint: lintTarget,
            fmt: fmtTarget,
            debug: debugTarget,
            execute: executeTarget,
        });
    });

    it('should return correct targets for Lib project type', () => {
        const result = getProjectTargets(CProjectType.Lib);
        expect(result).toEqual({
            cmake: cmakeTarget,
            build: buildTarget,
            lint: lintTarget,
            fmt: fmtTarget,
        });
    });

    it('should return correct targets for Test project type', () => {
        const result = getProjectTargets(CProjectType.Test);
        expect(result).toEqual({
            cmake: cmakeTarget,
            build: buildTarget,
            lint: lintTarget,
            fmt: fmtTarget,
            test: testTarget,
        });
    });
});
