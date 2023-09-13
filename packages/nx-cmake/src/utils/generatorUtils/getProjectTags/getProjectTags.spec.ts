import { CProjectType } from '../../../models/types';
import { getProjectTags } from './getProjectTags';

describe('getProjectTags', () => {
    it('should get project tags for app', () => {
        const tags = getProjectTags(CProjectType.App);
        expect(tags).toStrictEqual([]);
    });

    it('should get project tags for lib', () => {
        const tags = getProjectTags(CProjectType.Lib);
        expect(tags).toStrictEqual([]);
    });

    it('should get project tags for test', () => {
        const tags = getProjectTags(CProjectType.Test);
        expect(tags).toStrictEqual(['test']);
    });
});
