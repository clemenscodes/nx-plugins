export const DEBUG_TARGET_NAME = 'debug';

export type DebugTargetName = typeof DEBUG_TARGET_NAME;

export type DebugTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export const getDebugTargetDefault = (): DebugTargetConfiguration => {
    const debugTargetDefault: DebugTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return debugTargetDefault;
};
