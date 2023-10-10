export const LINT_TARGET_NAME = 'lint';

export type LintTargetName = typeof LINT_TARGET_NAME;

export type LintTargetConfiguration = {
    dependsOn: ['cmake'];
    inputs: ['clangTidy'];
};

export const getLintTargetDefault = (): LintTargetConfiguration => {
    const lintTargetDefault: LintTargetConfiguration = {
        dependsOn: ['cmake'],
        inputs: ['clangTidy'],
    };
    return lintTargetDefault;
};
