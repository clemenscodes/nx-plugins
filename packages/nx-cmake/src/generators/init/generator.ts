import { join } from 'path';
import type { InitGeneratorSchema } from './schema';
import {
    type Tree,
    type NxJsonConfiguration,
    formatFiles,
    generateFiles,
    readNxJson,
    updateNxJson,
} from '@nx/devkit';
import { PLUGIN_NAME } from '../../config/pluginName';

const addCacheableTargets = (
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    const { tasksRunnerOptions } = updatedNxJson;
    const defaultTasksRunnerOptions = {
        default: {
            runner: 'nx/tasks-runners/default',
            options: {
                cacheableOperations: ['build', 'debug', 'test', 'lint', 'fmt'],
            },
        },
    };

    const { runner: defaultRunner, options: defaultOptions } =
        defaultTasksRunnerOptions.default;

    const { cacheableOperations: defaultOperations } = defaultOptions;

    if (!tasksRunnerOptions) {
        updatedNxJson.tasksRunnerOptions = defaultTasksRunnerOptions;
        return updatedNxJson;
    }

    if (!tasksRunnerOptions.default) {
        updatedNxJson.tasksRunnerOptions.default =
            defaultTasksRunnerOptions.default;
        return updatedNxJson;
    }

    const { runner, options } = tasksRunnerOptions.default;

    if (!runner) {
        updatedNxJson.tasksRunnerOptions.default.runner = defaultRunner;
    }

    if (!options) {
        updatedNxJson.tasksRunnerOptions.default.options = defaultOptions;
        return updatedNxJson;
    }

    let { cacheableOperations } = options;

    if (!cacheableOperations || !Array.isArray(cacheableOperations)) {
        updatedNxJson.tasksRunnerOptions.default.options.cacheableOperations =
            defaultOperations;
        return updatedNxJson;
    }

    cacheableOperations = [
        ...new Set([...cacheableOperations, ...defaultOperations]),
    ];

    updatedNxJson.tasksRunnerOptions.default.options.cacheableOperations =
        cacheableOperations;

    return updatedNxJson;
};

const addTargetDefaults = (
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    const cmakeTargetDefault = {
        dependsOn: ['^cmake'],
        inputs: ['cmake'],
    };

    const buildTargetDefault = {
        dependsOn: ['^build', 'cmake'],
        inputs: ['default'],
    };

    const dependsOnBuild = ['build'];
    const defaultInput = ['default'];

    const debugTargetDefault = {
        dependsOn: dependsOnBuild,
        inputs: defaultInput,
    };

    const executeTargetDefault = {
        dependsOn: dependsOnBuild,
        inputs: defaultInput,
    };

    if (!updatedNxJson.targetDefaults) {
        updatedNxJson.targetDefaults = {
            cmake: cmakeTargetDefault,
            build: buildTargetDefault,
            debug: debugTargetDefault,
            execute: executeTargetDefault,
        };
    }

    if (!('cmake' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.cmake = cmakeTargetDefault;
    }

    if (!('build' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.build = buildTargetDefault;
    }

    if (!('debug' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.debug = debugTargetDefault;
    }

    if (!('execute' in updatedNxJson.targetDefaults)) {
        updatedNxJson.targetDefaults.execute = executeTargetDefault;
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn) {
        updatedNxJson.targetDefaults.build.dependsOn = dependsOnBuild;
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('^build')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('^build');
    }

    if (!updatedNxJson.targetDefaults.build.dependsOn.includes('cmake')) {
        updatedNxJson.targetDefaults.build.dependsOn.push('cmake');
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn) {
        updatedNxJson.targetDefaults.debug.dependsOn = dependsOnBuild;
    }

    if (!updatedNxJson.targetDefaults.debug.dependsOn.includes('build')) {
        updatedNxJson.targetDefaults.debug.dependsOn.push('build');
    }

    return updatedNxJson;
};

const addCmakeNamedInput = (
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    const cmakeNamedInput = [
        '{projectRoot}/**/*.cpp',
        '{projectRoot}/**/*.hpp',
        '{projectRoot}/**/*.c',
        '{projectRoot}/**/*.h',
        '{projectRoot}/CMakeLists.txt',
        '{workspaceRoot}/CMakeLists.txt',
        '{workspaceRoot}/cmake/**/*.cmake',
    ];

    if (!updatedNxJson.namedInputs) {
        updatedNxJson.namedInputs = {
            cmake: cmakeNamedInput,
        };
    }

    if (!('cmake' in updatedNxJson.namedInputs)) {
        updatedNxJson.namedInputs.cmake = cmakeNamedInput;
    }

    return updatedNxJson;
};

const addCmakePlugin = (
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    const { plugins } = updatedNxJson;

    if (plugins && !plugins.includes(PLUGIN_NAME)) {
        updatedNxJson.plugins.push(PLUGIN_NAME);
        return updatedNxJson;
    }

    updatedNxJson.plugins = [PLUGIN_NAME];
    return updatedNxJson;
};

const setWorkspaceLayout = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema
): [NxJsonConfiguration, InitGeneratorSchema] => {
    const { appsDir, libsDir, projectNameAndRootFormat } = options;

    if (!nxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
            projectNameAndRootFormat,
        };
        return [updatedNxJson, options];
    }

    if (!nxJson.workspaceLayout.appsDir) {
        updatedNxJson.workspaceLayout.appsDir = options.appsDir;
    } else {
        options.appsDir = nxJson.workspaceLayout.appsDir;
    }

    if (!nxJson.workspaceLayout.libsDir) {
        updatedNxJson.workspaceLayout.libsDir = options.libsDir;
    } else {
        options.libsDir = nxJson.workspaceLayout.libsDir;
    }

    if (!nxJson.workspaceLayout.projectNameAndRootFormat) {
        updatedNxJson.workspaceLayout.projectNameAndRootFormat =
            options.projectNameAndRootFormat;
    } else {
        options.projectNameAndRootFormat =
            nxJson.workspaceLayout.projectNameAndRootFormat;
    }
    return [updatedNxJson, options];
};

const generateCmakeConfigFiles = (tree: Tree, options: InitGeneratorSchema) => {
    generateFiles(
        tree,
        join(__dirname, 'template', 'cmake'),
        options.cmakeConfigDir,
        options
    );
};

const generateGlobalIncludeDir = (tree: Tree, options: InitGeneratorSchema) => {
    generateFiles(
        tree,
        join(__dirname, 'template', 'include'),
        'include',
        options
    );
};

const generateClangFormatPreset = (
    tree: Tree,
    options: InitGeneratorSchema
) => {
    generateFiles(tree, join(__dirname, 'template', 'style'), '.', options);
};

const generateRootConfig = (tree: Tree, options: InitGeneratorSchema) => {
    generateFiles(tree, join(__dirname, 'template', 'config'), '.', options);
};

const formatNxJson = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration
): NxJsonConfiguration => {
    let defaultProject: NxJsonConfiguration['defaultProject'];
    let affected: NxJsonConfiguration['affected'];
    let tasksRunnerOptions: NxJsonConfiguration['tasksRunnerOptions'];

    if (nxJson.defaultProject) {
        defaultProject = nxJson.defaultProject;
    }

    if (nxJson.affected) {
        affected = nxJson.affected;
    }

    if (nxJson.tasksRunnerOptions) {
        tasksRunnerOptions = nxJson.tasksRunnerOptions;
    }

    const formattedUpdatedNxJson = {
        extends: nxJson.extends,
        $schema: nxJson['$schema'],
        ...(defaultProject ? { defaultProject } : {}),
        ...(affected ? { affected } : {}),
        ...(tasksRunnerOptions ? { tasksRunnerOptions } : {}),
        ...updatedNxJson,
    };

    return formattedUpdatedNxJson;
};

const getUpdatedNxJson = (
    nxJson: NxJsonConfiguration,
    options: InitGeneratorSchema
): [NxJsonConfiguration, InitGeneratorSchema] => {
    let updatedNxJson: NxJsonConfiguration = { ...nxJson };
    updatedNxJson = addTargetDefaults(updatedNxJson);
    updatedNxJson = addCacheableTargets(updatedNxJson);
    updatedNxJson = addCmakeNamedInput(updatedNxJson);
    updatedNxJson = addCmakePlugin(updatedNxJson);
    [updatedNxJson, options] = setWorkspaceLayout(
        nxJson,
        updatedNxJson,
        options
    );
    updatedNxJson = formatNxJson(nxJson, updatedNxJson);
    return [updatedNxJson, options];
};

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
    const { skipFormat } = options;
    const nxJson = readNxJson(tree);
    const [updatedNxJson, updatedOptions] = getUpdatedNxJson(nxJson, options);

    updateNxJson(tree, updatedNxJson);
    generateCmakeConfigFiles(tree, updatedOptions);
    generateGlobalIncludeDir(tree, updatedOptions);
    generateRootConfig(tree, updatedOptions);

    if (options.addClangFormatPreset) {
        generateClangFormatPreset(tree, updatedOptions);
    }

    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default initGenerator;
