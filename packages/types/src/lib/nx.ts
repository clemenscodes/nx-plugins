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

export type Graph = Record<string, Set<string>>;

export type C = 'C' | 'C++';

export type CMakeC = 'C' | 'CXX';

export type CTag = 'c' | 'cpp';

export type Deps = {
    sourceProject: string;
    dependsOnProject: string;
    file: string;
};

export type FilteredProject = {
    name: string;
    root: string;
    sourceRoot: string;
    type: CProjectType;
    tag: CTag;
};

export enum CProjectType {
    App = 'BIN',
    Lib = 'LIB',
    Test = 'TEST',
}
