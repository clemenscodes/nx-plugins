import type { C } from '@/types';
import { getProjectConfiguration } from './getProjectConfiguration';
import { CProjectType } from '@/types';
import {
    defaultTargets,
    appTargets,
    testTargets,
} from '../getProjectTargets/getProjectTargets';
import { PLUGIN_NAME } from '../../config';

describe('getProjectConfiguration', () => {
    let root: string;
    let type: CProjectType;
    let language: C;

    beforeEach(() => {
        root = 'libs/my-lib';
        type = CProjectType.Lib;
        language = 'C';
    });

    it('should return the correct configuration for a library project', () => {
        const result = getProjectConfiguration(root, type, language);
        expect(result).toEqual({
            'libmy-lib': {
                name: 'libmy-lib',
                root: 'libs/my-lib',
                sourceRoot: 'libs/my-lib/src',
                projectType: 'library',
                targets: defaultTargets,
                tags: [PLUGIN_NAME, 'c'],
            },
        });
    });

    it('should return the correct configuration for an application project', () => {
        root = 'apps/my-app';
        type = CProjectType.App;
        const result = getProjectConfiguration(root, type, language);
        expect(result).toEqual({
            'my-app': {
                name: 'my-app',
                root: 'apps/my-app',
                sourceRoot: 'apps/my-app/src',
                projectType: 'application',
                targets: appTargets,
                tags: [PLUGIN_NAME, 'c'],
            },
        });
    });

    it('should return the correct configuration for a test project', () => {
        root = 'apps/my-app';
        type = CProjectType.Test;
        language = 'C++';
        const result = getProjectConfiguration(root, type, language);
        expect(result).toEqual({
            'testmy-app': {
                name: 'testmy-app',
                root: 'apps/my-app',
                sourceRoot: 'apps/my-app/src',
                projectType: 'application',
                targets: testTargets,
                tags: [PLUGIN_NAME, 'cpp', 'test'],
            },
        });
    });
});
