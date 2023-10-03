import type { NxJsonConfiguration } from '@nx/devkit';

export const formatNxJson = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
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
