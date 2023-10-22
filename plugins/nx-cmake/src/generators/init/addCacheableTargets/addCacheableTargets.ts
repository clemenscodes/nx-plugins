import type { NxJsonConfiguration } from '@nx/devkit';

export const addCacheableTargets = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const { tasksRunnerOptions } = updatedNxJson;
    const defaultTasksRunnerOptions = {
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
    };

    const { runner: defaultRunner, options: defaultOptions } =
        defaultTasksRunnerOptions.default;

    if (!updatedNxJson.tasksRunnerOptions) {
        updatedNxJson.tasksRunnerOptions = {};
    }

    const { cacheableOperations: defaultOperations } = defaultOptions;

    if (!tasksRunnerOptions) {
        updatedNxJson.tasksRunnerOptions = defaultTasksRunnerOptions;
        return updatedNxJson;
    }

    if (!tasksRunnerOptions['default']) {
        updatedNxJson.tasksRunnerOptions['default'] =
            defaultTasksRunnerOptions.default;
        return updatedNxJson;
    }

    const { runner, options } = tasksRunnerOptions['default'];

    if (!runner) {
        updatedNxJson.tasksRunnerOptions['default'].runner = defaultRunner;
    }

    if (!options) {
        updatedNxJson.tasksRunnerOptions['default'].options = defaultOptions;
        return updatedNxJson;
    }

    let { cacheableOperations } = options;

    if (!cacheableOperations || !Array.isArray(cacheableOperations)) {
        updatedNxJson.tasksRunnerOptions[
            'default'
        ].options.cacheableOperations = defaultOperations;
        return updatedNxJson;
    }

    cacheableOperations = [
        ...new Set([...cacheableOperations, ...defaultOperations]),
    ];

    updatedNxJson.tasksRunnerOptions['default'].options.cacheableOperations =
        cacheableOperations;

    return updatedNxJson;
};
