import { CProjectType } from '@/types';
import { getProjectTags } from './getProjectTags';
import { PLUGIN_NAME } from '../../config';

describe('getProjectTags', () => {
    it('should get project tags for app', () => {
        const tags = getProjectTags(CProjectType.App, 'C');
        expect(tags).toStrictEqual([PLUGIN_NAME, 'c']);
    });

    it('should get project tags for lib', () => {
        const tags = getProjectTags(CProjectType.Lib, 'C++');
        expect(tags).toStrictEqual([PLUGIN_NAME, 'cpp']);
    });

    it('should get project tags for test', () => {
        const tags = getProjectTags(CProjectType.Test, 'C++');
        expect(tags).toStrictEqual([PLUGIN_NAME, 'cpp', 'test']);
    });
});
