import { PLUGIN_NAME } from '../../name';
import { CmakeTargetName } from '../getCmakeTargetDefault/getCmakeTargetDefault';

export const COMPILE_TARGET_NAME = `${PLUGIN_NAME}:compile`;

export type CompileTargetName = typeof COMPILE_TARGET_NAME;

export type CompileTargetConfiguration = {
    dependsOn: [
        `^${CmakeTargetName}`,
        `^${CompileTargetName}`,
        CmakeTargetName,
    ];
    inputs: ['default'];
};

export const getCompileTargetDefault = (): CompileTargetConfiguration => {
    const compileTargetDefault: CompileTargetConfiguration = {
        dependsOn: ['^nx-cmake:cmake', '^nx-cmake:compile', 'nx-cmake:cmake'],
        inputs: ['default'],
    };
    return compileTargetDefault;
};
