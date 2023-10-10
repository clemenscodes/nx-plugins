import type { NxTargetDefaults } from '@/config';
import type { NxJsonConfiguration, TargetConfiguration } from '@nx/devkit';

const CMAKE_TARGET_NAME = 'cmake';

export type CmakeTargetName = typeof CMAKE_TARGET_NAME;

export type CmakeTargetConfiguration = {
    dependsOn: ['^cmake'];
    inputs: ['cmake'];
};

export type CmakeTarget = Record<CmakeTargetName, CmakeTargetConfiguration>;

export const getCmakeTargetDefault = (): CmakeTargetConfiguration => {
    const cmakeTargetDefault: CmakeTargetConfiguration = {
        dependsOn: ['^cmake'],
        inputs: ['cmake'],
    };
    return cmakeTargetDefault;
};

export const getCmakeTarget = (): CmakeTarget => {
    const cmakeTargetConfiguration = getCmakeTargetDefault();
    const cmakeTarget = {
        cmake: cmakeTargetConfiguration,
    };
    return cmakeTarget;
};

const BUILD_TARGET_NAME = 'build';

export type BuildTargetName = typeof BUILD_TARGET_NAME;

export type BuildTargetConfiguration = {
    dependsOn: ['^cmake', '^build', 'cmake'];
    inputs: ['default'];
};

export type BuildTarget = Record<BuildTargetName, BuildTargetConfiguration>;

export const getBuildTargetDefault = (): BuildTargetConfiguration => {
    const buildTargetDefault: BuildTargetConfiguration = {
        dependsOn: ['^cmake', '^build', 'cmake'],
        inputs: ['default'],
    };
    return buildTargetDefault;
};

export const getBuildTarget = (): BuildTarget => {
    const buildTargetDefault = getBuildTargetDefault();
    const buildTarget = {
        build: buildTargetDefault,
    };
    return buildTarget;
};

const FMT_TARGET_NAME = 'fmt';

export type FmtTargetName = typeof FMT_TARGET_NAME;

export type FmtTargetConfiguration = {
    dependsOn: [];
    inputs: ['clangFormat'];
};

export type FmtTarget = Record<FmtTargetName, FmtTargetConfiguration>;

export const getFmtTargetDefault = (): FmtTargetConfiguration => {
    const fmtTargetDefault: FmtTargetConfiguration = {
        dependsOn: [],
        inputs: ['clangFormat'],
    };
    return fmtTargetDefault;
};

export const getFmtTarget = (): FmtTarget => {
    const fmtTargetDefault = getFmtTargetDefault();
    const fmtTarget = {
        fmt: fmtTargetDefault,
    };
    return fmtTarget;
};

const LINT_TARGET_NAME = 'lint';

export type LintTargetName = typeof LINT_TARGET_NAME;

export type LintTargetConfiguration = {
    dependsOn: ['cmake'];
    inputs: ['clangTidy'];
};
export type LintTarget = Record<LintTargetName, LintTargetConfiguration>;

export const getLintTargetDefault = (): LintTargetConfiguration => {
    const lintTargetDefault: LintTargetConfiguration = {
        dependsOn: ['cmake'],
        inputs: ['clangTidy'],
    };
    return lintTargetDefault;
};

export const getLintTarget = (): LintTarget => {
    const lintTargetDefault = getLintTargetDefault();
    const lintTarget = {
        lint: lintTargetDefault,
    };
    return lintTarget;
};

const TEST_TARGET_NAME = 'test';

export type TestTargetName = typeof TEST_TARGET_NAME;

export type TestTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export type TestTarget = Record<TestTargetName, TestTargetConfiguration>;

export const getTestTargetDefault = (): TestTargetConfiguration => {
    const testTargetDefault: TestTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return testTargetDefault;
};

export const getTestTarget = (): TestTarget => {
    const testTargetDefault = getTestTargetDefault();
    const testTarget = {
        test: testTargetDefault,
    };
    return testTarget;
};

const EXECUTE_TARGET_NAME = 'execute';

export type ExecuteTargetName = typeof EXECUTE_TARGET_NAME;

export type ExecuteTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export type ExecuteTarget = Record<
    ExecuteTargetName,
    ExecuteTargetConfiguration
>;

export const getExecuteTargetDefault = (): ExecuteTargetConfiguration => {
    const executeTargetDefault: ExecuteTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return executeTargetDefault;
};

export const getExecuteTarget = (): ExecuteTarget => {
    const executeTargetDefault = getExecuteTargetDefault();
    const executeTarget = {
        execute: executeTargetDefault,
    };
    return executeTarget;
};

const DEBUG_TARGET_NAME = 'debug';

export type DebugTargetName = typeof DEBUG_TARGET_NAME;

export type DebugTargetConfiguration = {
    dependsOn: ['build'];
    inputs: ['default'];
};

export type DebugTarget = Record<DebugTargetName, DebugTargetConfiguration>;

export const getDebugTargetDefault = (): DebugTargetConfiguration => {
    const debugTargetDefault: DebugTargetConfiguration = {
        dependsOn: ['build'],
        inputs: ['default'],
    };
    return debugTargetDefault;
};

export const getDebugTarget = (): DebugTarget => {
    const debugTargetDefault = getDebugTargetDefault();
    const debugTarget = {
        debug: debugTargetDefault,
    };
    return debugTarget;
};

export type TargetName =
    | CmakeTargetName
    | BuildTargetName
    | LintTargetName
    | FmtTargetName
    | TestTargetName
    | ExecuteTargetName
    | DebugTargetName;

type PluginTargetDefaults = {
    cmake: CmakeTargetConfiguration;
    build: BuildTargetConfiguration;
    fmt: FmtTargetConfiguration;
    lint: LintTargetConfiguration;
    test: TestTargetConfiguration;
    execute: ExecuteTargetConfiguration;
    debug: DebugTargetConfiguration;
};

type PluginDefaults = {
    [K in TargetName]: PluginTargetDefaults[K];
};

export function assertIsTargetName(s: string): asserts s is TargetName {
    switch (s) {
        case CMAKE_TARGET_NAME:
            break;
        case BUILD_TARGET_NAME:
            break;
        case FMT_TARGET_NAME:
            break;
        case LINT_TARGET_NAME:
            break;
        case TEST_TARGET_NAME:
            break;
        case EXECUTE_TARGET_NAME:
            break;
        case DEBUG_TARGET_NAME:
            break;
        default:
            throw new Error(`${s} is not a valid target`);
    }
}

export const fillEmptyTargets = <T extends PluginDefaults>(
    targets: T,
    nxTargets: NxTargetDefaults,
): NonNullable<NxTargetDefaults> => {
    let updatedNxTargets: NonNullable<NxTargetDefaults> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets = addDefaultIfNotExist(
            nxTargets,
            target,
            targetConfig,
        );
    }
    return updatedNxTargets;
};

export const getTargetDefaults = (): PluginDefaults => {
    const targetDefaults: PluginDefaults = {
        cmake: getCmakeTargetDefault(),
        build: getBuildTargetDefault(),
        fmt: getFmtTargetDefault(),
        lint: getLintTargetDefault(),
        test: getTestTargetDefault(),
        execute: getExecuteTargetDefault(),
        debug: getDebugTargetDefault(),
    };
    return targetDefaults;
};

export const addDefaultIfNotExist = (
    targetDefaults: NxTargetDefaults,
    field: TargetName,
    defaultValue: PluginDefaults[TargetName],
): NonNullable<NxTargetDefaults> => {
    if (!targetDefaults) {
        targetDefaults = getTargetDefaults();
    }
    if (!(field in targetDefaults)) {
        targetDefaults[field] = defaultValue;
    }
    return targetDefaults;
};

export const fillDependsOn = <T extends PluginDefaults>(
    targets: T,
    nxTargets: NonNullable<NxTargetDefaults>,
): NonNullable<TargetDefaultsWithDependsOn> => {
    const updatedNxTargets: NonNullable<TargetDefaultsWithDependsOn> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets[target] = addDependsOnIfNotExist(
            nxTargets,
            target,
            targetConfig.dependsOn,
        );
    }
    return updatedNxTargets;
};

export const fillInputs = <T extends PluginDefaults>(
    targets: T,
    nxTargets: NonNullable<TargetDefaultsWithDependsOn>,
): NonNullable<TargetDefaultsWithInputs> => {
    const updatedNxTargets: NonNullable<TargetDefaultsWithInputs> = {};
    for (const target in targets) {
        assertIsTargetName(target);
        const targetConfig = targets[target];
        updatedNxTargets[target] = addInputsIfNotExist(
            nxTargets,
            target,
            targetConfig.inputs,
        );
    }
    return updatedNxTargets;
};

type TargetConfigurationWithDependsOn = TargetConfiguration & {
    dependsOn: NonNullable<TargetConfiguration['dependsOn']>;
};

type TargetConfigurationWithInputs = TargetConfiguration & {
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

export const mergeArrays = <T>(
    existing: T[] | undefined,
    defaults: T[] | undefined,
): T[] => {
    const uniqueValues = new Set<T>();
    if (Array.isArray(existing)) {
        existing.forEach((element) => {
            uniqueValues.add(element);
        });
    }
    if (Array.isArray(defaults)) {
        defaults.forEach((element) => {
            uniqueValues.add(element);
        });
    }
    return Array.from(uniqueValues);
};

export const addDependsOnIfNotExist = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultDependsOn: PluginDefaults[TargetName]['dependsOn'],
): TargetConfigurationWithDependsOn => {
    const targetConfig = targetDefaults[field];
    const mergedDependsOn = mergeArrays(
        targetConfig.dependsOn,
        defaultDependsOn,
    );
    const targetConfigWithDependsOn: TargetConfigurationWithDependsOn = {
        ...targetConfig,
        dependsOn: mergedDependsOn,
    };
    return targetConfigWithDependsOn;
};

export const addInputsIfNotExist = (
    targetDefaults: NonNullable<NxTargetDefaults>,
    field: TargetName,
    defaultInputs: PluginDefaults[TargetName]['inputs'],
): TargetConfigurationWithInputs => {
    const targetConfig = targetDefaults[field];
    const mergedInputs = mergeArrays(targetConfig.inputs, defaultInputs);
    const targetConfigWithInputs: TargetConfigurationWithInputs = {
        ...targetConfig,
        inputs: mergedInputs,
    };
    return targetConfigWithInputs;
};

export const addTargetDefaults = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const pluginTargetDefaults = getTargetDefaults();
    const targetDefaults = fillEmptyTargets(
        pluginTargetDefaults,
        updatedNxJson.targetDefaults,
    );
    const targetDefaultsWithDependsOn = fillDependsOn(
        pluginTargetDefaults,
        targetDefaults,
    );
    const targetsWithInputs = fillInputs(
        pluginTargetDefaults,
        targetDefaultsWithDependsOn,
    );
    updatedNxJson.targetDefaults = targetsWithInputs;
    return updatedNxJson;
};
