export const FMT_TARGET_NAME = 'fmt';

export type FmtTargetName = typeof FMT_TARGET_NAME;

export type FmtTargetConfiguration = {
    dependsOn: [];
    inputs: ['clangFormat'];
};

export const getFmtTargetDefault = (): FmtTargetConfiguration => {
    const fmtTargetDefault: FmtTargetConfiguration = {
        dependsOn: [],
        inputs: ['clangFormat'],
    };
    return fmtTargetDefault;
};
