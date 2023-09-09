import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../schema';
import { addTargetDefaults } from './addTargetDefaults';
import { addCacheableTargets } from './addCacheableTargets';
import { addCmakeNamedInput } from './addCmakeNamedInput';
import { addCmakePlugin } from './addCmakePlugin';
import { setWorkspaceLayout } from './setWorkspaceLayout';
import { formatNxJson } from './formatNxJson';

export const getUpdatedNxJson = (
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
