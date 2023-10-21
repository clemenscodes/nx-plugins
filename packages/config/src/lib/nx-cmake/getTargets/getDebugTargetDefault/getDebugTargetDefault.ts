import { CompileTargetName } from '../getCompileTargetDefault/getCompileTargetDefault';

export const DEBUG_TARGET_NAME = 'debug';

export type DebugTargetName = typeof DEBUG_TARGET_NAME;

export type DebugTargetConfiguration = {
    dependsOn: [CompileTargetName];
    inputs: ['default'];
};

export const getDebugTargetDefault = (): DebugTargetConfiguration => {
    const debugTargetDefault: DebugTargetConfiguration = {
        dependsOn: ['compile'],
        inputs: ['default'],
    };
    return debugTargetDefault;
};
