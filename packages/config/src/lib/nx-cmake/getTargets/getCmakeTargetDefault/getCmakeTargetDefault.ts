export const CMAKE_TARGET_NAME = 'cmake';

export type CmakeTargetName = typeof CMAKE_TARGET_NAME;

export type CmakeTargetConfiguration = {
    dependsOn: [`^${CmakeTargetName}`];
    inputs: ['cmake'];
};

export const getCmakeTargetDefault = (): CmakeTargetConfiguration => {
    const cmakeTargetDefault: CmakeTargetConfiguration = {
        dependsOn: ['^cmake'],
        inputs: ['cmake'],
    };
    return cmakeTargetDefault;
};
