import { PLUGIN_NAME } from '../../name';
import { CompileTargetName } from '../getCompileTargetDefault/getCompileTargetDefault';

export const TEST_TARGET_NAME = `${PLUGIN_NAME}:test`;

export type TestTargetName = typeof TEST_TARGET_NAME;

export type TestTargetConfiguration = {
    dependsOn: [CompileTargetName];
    inputs: ['default'];
};

export const getTestTargetDefault = (): TestTargetConfiguration => {
    const testTargetDefault: TestTargetConfiguration = {
        dependsOn: ['nx-cmake:compile'],
        inputs: ['default'],
    };
    return testTargetDefault;
};
