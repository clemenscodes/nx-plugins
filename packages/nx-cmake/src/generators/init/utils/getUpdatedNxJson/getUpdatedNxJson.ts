import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { addTargetDefaults } from '../addTargetDefaults/addTargetDefaults';
import { addCacheableTargets } from '../addCacheableTargets/addCacheableTargets';
import { addCmakeNamedInput } from '../addCmakeNamedInput/addCmakeNamedInput';
import { addCmakePlugin } from '../addCmakePlugin/addCmakePlugin';
import { setWorkspaceLayout } from '../setWorkspaceLayout/setWorkspaceLayout';
import { formatNxJson } from '../formatNxJson/formatNxJson';
import { addClangFormatNamedInput } from '../addClangFormatNamedInput/addClangFormatNamedInput';
import { addClangTidyNamedInput } from '../addClangTidyNamedInput/addClangTidyNamedInput';

export const getUpdatedNxJson = (
    nxJson: NxJsonConfiguration,
    options: InitGeneratorSchema,
): [NxJsonConfiguration, InitGeneratorSchema] => {
    let updatedNxJson: NxJsonConfiguration = { ...nxJson };
    updatedNxJson = addTargetDefaults(updatedNxJson);
    updatedNxJson = addCacheableTargets(updatedNxJson);
    updatedNxJson = addCmakeNamedInput(updatedNxJson);
    updatedNxJson = addClangFormatNamedInput(updatedNxJson);
    updatedNxJson = addClangTidyNamedInput(updatedNxJson);
    updatedNxJson = addCmakePlugin(updatedNxJson);
    [updatedNxJson, options] = setWorkspaceLayout(
        nxJson,
        updatedNxJson,
        options,
    );
    updatedNxJson = formatNxJson(nxJson, updatedNxJson);
    return [updatedNxJson, options];
};
