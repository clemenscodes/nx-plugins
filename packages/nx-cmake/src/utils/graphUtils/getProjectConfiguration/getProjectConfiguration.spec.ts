import { getProjectConfiguration } from './getProjectConfiguration';
import { CProjectType } from '../../../models/types';
import {
    appTargets,
    defaultTargets,
    testTargets,
} from '../../getProjectTargets/getProjectTargets';

describe('getProjectConfiguration', () => {
    it('should return the correct configuration for a library project', () => {
        const root = 'libs/my-lib';
        const type = CProjectType.Lib;

        const result = getProjectConfiguration(root, type);

        expect(result).toEqual({
            'libmy-lib': {
                name: 'libmy-lib',
                root: 'libs/my-lib',
                sourceRoot: 'libs/my-lib/src',
                projectType: 'library',
                targets: defaultTargets,
            },
        });
    });

    it('should return the correct configuration for an application project', () => {
        const root = 'apps/my-app';
        const type = CProjectType.App;

        const result = getProjectConfiguration(root, type);

        expect(result).toEqual({
            'my-app': {
                name: 'my-app',
                root: 'apps/my-app',
                sourceRoot: 'apps/my-app/src',
                projectType: 'application',
                targets: appTargets,
            },
        });
    });

    it('should return the correct configuration for a test project', () => {
        const root = 'apps/my-app';
        const type = CProjectType.Test;

        const result = getProjectConfiguration(root, type);

        expect(result).toEqual({
            'testmy-app': {
                name: 'testmy-app',
                root: 'apps/my-app',
                sourceRoot: 'apps/my-app/src',
                projectType: 'application',
                targets: testTargets,
            },
        });
    });
});
