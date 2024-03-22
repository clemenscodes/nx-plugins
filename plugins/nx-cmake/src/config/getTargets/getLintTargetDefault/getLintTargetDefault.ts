import { PLUGIN_NAME } from '../../name';
import { CmakeTargetName } from '../getCmakeTargetDefault/getCmakeTargetDefault';

export const LINT_TARGET_NAME = `${PLUGIN_NAME}:lint`;

export type LintTargetName = typeof LINT_TARGET_NAME;

export type LintTargetConfiguration = {
    dependsOn: [CmakeTargetName];
    inputs: ['clangTidy'];
};

export const getLintTargetDefault = (): LintTargetConfiguration => {
    const lintTargetDefault: LintTargetConfiguration = {
        dependsOn: ['nx-cmake:cmake'],
        inputs: ['clangTidy'],
    };
    return lintTargetDefault;
};
