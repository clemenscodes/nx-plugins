import { CompileTargetName } from '../getCompileTargetDefault/getCompileTargetDefault';
export const TEST_TARGET_NAME = 'test';

export type TestTargetName = typeof TEST_TARGET_NAME;

export type TestTargetConfiguration = {
    dependsOn: [CompileTargetName];
    inputs: ['default'];
};

export const getTestTargetDefault = (): TestTargetConfiguration => {
    const testTargetDefault: TestTargetConfiguration = {
        dependsOn: ['compile'],
        inputs: ['default'],
    };
    return testTargetDefault;
};
