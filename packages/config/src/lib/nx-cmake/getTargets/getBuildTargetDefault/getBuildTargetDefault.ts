export const BUILD_TARGET_NAME = 'build';

export type BuildTargetName = typeof BUILD_TARGET_NAME;

export type BuildTargetConfiguration = {
    dependsOn: ['^cmake', '^build', 'cmake'];
    inputs: ['default'];
};

export const getBuildTargetDefault = (): BuildTargetConfiguration => {
    const buildTargetDefault: BuildTargetConfiguration = {
        dependsOn: ['^cmake', '^build', 'cmake'],
        inputs: ['default'],
    };
    return buildTargetDefault;
};
