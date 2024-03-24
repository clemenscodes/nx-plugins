import { PLUGIN_NAME } from '../../name';
import { CompileTargetName } from '../getCompileTargetDefault/getCompileTargetDefault';

export const DEBUG_TARGET_NAME = `${PLUGIN_NAME}:debug`;

export type DebugTargetName = typeof DEBUG_TARGET_NAME;

export type DebugTargetConfiguration = {
    dependsOn: [CompileTargetName];
    inputs: ['default'];
};

export const getDebugTargetDefault = (): DebugTargetConfiguration => {
    const debugTargetDefault: DebugTargetConfiguration = {
        dependsOn: ['nx-cmake:compile'],
        inputs: ['default'],
    };
    return debugTargetDefault;
};
