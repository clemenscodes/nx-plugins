import { getProjectName } from './getProjectName';
import { CProjectType } from '../../models/types';

describe('getProjectName', () => {
    it('should return the project name for an App project', () => {
        const root = 'apps/my-app';
        const type = CProjectType.App;

        const result = getProjectName(type, root);

        expect(result).toEqual('my-app');
    });

    it('should return the project name for a Lib project', () => {
        const root = 'libs/my-lib';
        const type = CProjectType.Lib;

        const result = getProjectName(type, root);

        expect(result).toEqual('libmy-lib');
    });

    it('should return the project name for a Test project', () => {
        const root = 'apps/my-app';
        const type = CProjectType.Test;

        const result = getProjectName(type, root);

        expect(result).toEqual('testmy-app');
    });

    it('should return the project name for a nested App project', () => {
        const root = 'apps/my-parent-app/my-app';
        const type = CProjectType.App;

        const result = getProjectName(type, root);

        expect(result).toEqual('my-app');
    });

    it('should return the project name for a nested Lib project', () => {
        const root = 'libs/my-parent-lib/my-lib';
        const type = CProjectType.Lib;

        const result = getProjectName(type, root);

        expect(result).toEqual('libmy-lib');
    });

    it('should return the project name for a nested Test project', () => {
        const root = 'apps/my-parent-app/my-app';
        const type = CProjectType.Test;

        const result = getProjectName(type, root);

        expect(result).toEqual('testmy-app');
    });
});
