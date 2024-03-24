import { PLUGIN_NAME } from '../../name';

export const CMAKE_TARGET_NAME = `${PLUGIN_NAME}:cmake`;

export type CmakeTargetName = typeof CMAKE_TARGET_NAME;

export type CmakeTargetConfiguration = {
    dependsOn: [`^${CmakeTargetName}`];
    inputs: ['cmake'];
};

export const getCmakeTargetDefault = (): CmakeTargetConfiguration => {
    const cmakeTargetDefault: CmakeTargetConfiguration = {
        dependsOn: ['^nx-cmake:cmake'],
        inputs: ['cmake'],
    };
    return cmakeTargetDefault;
};
