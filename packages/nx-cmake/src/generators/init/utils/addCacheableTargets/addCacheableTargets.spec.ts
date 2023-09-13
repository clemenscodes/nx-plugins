import { addCacheableTargets } from './addCacheableTargets';

describe('addCacheableTargets', () => {
    it('should add default cacheableOperations when tasksRunnerOptions is missing', () => {
        const updatedNxJson = {};
        const expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                    options: {
                        cacheableOperations: [
                            'build',
                            'debug',
                            'test',
                            'lint',
                            'cmake',
                            'fmt',
                        ],
                    },
                },
            },
        };

        const result = addCacheableTargets(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add default cacheableOperations when tasksRunnerOptions.default is missing', () => {
        const updatedNxJson = {
            tasksRunnerOptions: {},
        };
        const expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                    options: {
                        cacheableOperations: [
                            'build',
                            'debug',
                            'test',
                            'lint',
                            'cmake',
                            'fmt',
                        ],
                    },
                },
            },
        };

        const result = addCacheableTargets(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add default runner and cacheableOperations when tasksRunnerOptions.default.runner is missing', () => {
        const updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: '',
                },
            },
        };
        const expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                    options: {
                        cacheableOperations: [
                            'build',
                            'debug',
                            'test',
                            'lint',
                            'cmake',
                            'fmt',
                        ],
                    },
                },
            },
        };

        const result = addCacheableTargets(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add default cacheableOperations when tasksRunnerOptions.default.options is missing', () => {
        const updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                },
            },
        };
        const expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                    options: {
                        cacheableOperations: [
                            'build',
                            'debug',
                            'test',
                            'lint',
                            'cmake',
                            'fmt',
                        ],
                    },
                },
            },
        };

        const result = addCacheableTargets(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should merge cacheableOperations when tasksRunnerOptions.default.options.cacheableOperations is present', () => {
        const updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                    options: {
                        cacheableOperations: ['custom-op', 'test'],
                    },
                },
            },
        };
        const expectedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'custom-runner',
                    options: {
                        cacheableOperations: [
                            'custom-op',
                            'test',
                            'build',
                            'debug',
                            'lint',
                            'cmake',
                            'fmt',
                        ],
                    },
                },
            },
        };

        const result = addCacheableTargets(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });
});
