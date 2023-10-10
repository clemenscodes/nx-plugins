export const TEST_TARGET_NAME = 'test';

export type TestTargetName = typeof TEST_TARGET_NAME;

export type TestTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export const getTestTargetDefault = (): TestTargetConfiguration => {
    const testTargetDefault: TestTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return testTargetDefault;
};
