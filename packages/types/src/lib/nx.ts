import type { NxJsonConfiguration, TargetConfiguration } from '@nx/devkit';

export type NxPluginsConfig = NxJsonConfiguration['pluginsConfig'];

export type NxGeneratorConfig = NxJsonConfiguration['generators'];

export type NxTargetDefaults = NxJsonConfiguration['targetDefaults'];

export type TargetConfigurationWithDependsOn = TargetConfiguration & {
    dependsOn: NonNullable<TargetConfiguration['dependsOn']>;
};

export type TargetConfigurationWithInputs = TargetConfiguration & {
    inputs: NonNullable<TargetConfiguration['inputs']>;
};

export type TargetDefaultsWithDependsOn = Record<
    string,
    TargetConfigurationWithDependsOn
>;

export type TargetDefaultsWithInputs = Record<
    string,
    TargetConfigurationWithInputs
>;

export type WorkspaceLayout = Required<
    NonNullable<NxJsonConfiguration['workspaceLayout']>
>;
