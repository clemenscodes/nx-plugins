import {
    debugTarget,
    defaultTargets,
    executeTarget,
    getProjectTargets,
    testTarget,
} from './getProjectTargets';
import { CProjectType } from '../../models/types';

describe('getProjectTargets', () => {
    it('should return correct targets for App project type', () => {
        const result = getProjectTargets(CProjectType.App);
        expect(result).toEqual({
            ...defaultTargets,
            debug: debugTarget,
            execute: executeTarget,
        });
    });

    it('should return correct targets for Lib project type', () => {
        const result = getProjectTargets(CProjectType.Lib);
        expect(result).toEqual(defaultTargets);
    });

    it('should return correct targets for Test project type', () => {
        const result = getProjectTargets(CProjectType.Test);
        expect(result).toEqual({
            ...defaultTargets,
            test: testTarget,
        });
    });
});
