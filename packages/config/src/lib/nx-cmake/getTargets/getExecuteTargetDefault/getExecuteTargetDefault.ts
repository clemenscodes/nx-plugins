export const EXECUTE_TARGET_NAME = 'execute';

export type ExecuteTargetName = typeof EXECUTE_TARGET_NAME;

export type ExecuteTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export const getExecuteTargetDefault = (): ExecuteTargetConfiguration => {
    const executeTargetDefault: ExecuteTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return executeTargetDefault;
};
