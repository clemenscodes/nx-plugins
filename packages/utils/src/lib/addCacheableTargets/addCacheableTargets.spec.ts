import type { NxJsonConfiguration } from '@nx/devkit';
import { addCacheableTargets } from './addCacheableTargets';

describe('addCacheableTargets', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {};
        expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                    options: {
                        cacheableOperations: [
                            'cmake',
                            'compile',
                            'test',
                            'lint',
                            'fmt',
                        ],
                    },
                },
            },
        };
    });

    it('should add default cacheableOperations when tasksRunnerOptions is missing', () => {
        const result = addCacheableTargets(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add deault cacheableOperations when tasksRunnerOptions.default is missing', () => {
        updatedNxJson.tasksRunnerOptions = {};
        const result = addCacheableTargets(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add deault runner and cacheableOperations when tasksRunnerOptions.default.runner is missing', () => {
        updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: '',
                },
            },
        };
        const result = addCacheableTargets(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add default cacheableOperations when tasksRunnerOptions.default.options is missing', () => {
        updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                },
            },
        };
        if (!expectedNxJson.tasksRunnerOptions) {
            expectedNxJson.tasksRunnerOptions = {};
        }
        expectedNxJson.tasksRunnerOptions['default'].runner = 'custom-runner';
        const result = addCacheableTargets(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should merge cacheableOperations when tasksRunnerOptions.default.options.cacheableOperations is present', () => {
        updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                    options: {
                        cacheableOperations: ['custom-op', 'test'],
                    },
                },
            },
        };
        if (!expectedNxJson.tasksRunnerOptions) {
            expectedNxJson.tasksRunnerOptions = {};
        }
        expectedNxJson.tasksRunnerOptions['default'].runner = 'custom-runner';
        expectedNxJson.tasksRunnerOptions[
            'default'
        ].options.cacheableOperations = [
            'custom-op',
            'test',
            'cmake',
            'compile',
            'lint',
            'fmt',
        ];
        const result = addCacheableTargets(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });
});
