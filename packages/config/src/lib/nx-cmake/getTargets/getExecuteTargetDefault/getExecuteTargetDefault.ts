import { CompileTargetName } from '../getCompileTargetDefault/getCompileTargetDefault';

export const EXECUTE_TARGET_NAME = 'execute';

export type ExecuteTargetName = typeof EXECUTE_TARGET_NAME;

export type ExecuteTargetConfiguration = {
    dependsOn: [CompileTargetName];
    inputs: ['default'];
};

export const getExecuteTargetDefault = (): ExecuteTargetConfiguration => {
    const executeTargetDefault: ExecuteTargetConfiguration = {
        dependsOn: ['compile'],
        inputs: ['default'],
    };
    return executeTargetDefault;
};
