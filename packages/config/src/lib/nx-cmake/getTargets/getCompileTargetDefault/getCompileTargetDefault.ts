export const COMPILE_TARGET_NAME = 'compile';

export type CompileTargetName = typeof COMPILE_TARGET_NAME;

export type CompileTargetConfiguration = {
    dependsOn: ['^cmake', '^build', 'cmake'];
    inputs: ['default'];
};

export const getCompileTargetDefault = (): CompileTargetConfiguration => {
    const compileTargetDefault: CompileTargetConfiguration = {
        dependsOn: ['^cmake', '^build', 'cmake'],
        inputs: ['default'],
    };
    return compileTargetDefault;
};
