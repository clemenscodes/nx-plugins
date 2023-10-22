import type { NxJsonConfiguration } from '@nx/devkit';
import { addTargetDefaults } from '../addTargetDefaults/addTargetDefaults';
import { addCmakePlugin } from '../addCmakePlugin/addCmakePlugin';
import { setWorkspaceLayout } from '../setWorkspaceLayout/setWorkspaceLayout';
import { writeConfig } from '../writeConfig/writeConfig';
import { writeGeneratorConfig } from '../writeGeneratorConfig/writeGeneratorConfig';
import { formatNxJson } from '@/util';
import { InitGeneratorSchema } from '../../generator';
import { addCacheableTargets } from '../addCacheableTargets/addCacheableTargets';
import { addClangFormatNamedInput } from '../addClangFormatNamedInput/addClangFormatNamedInput';
import { addClangTidyNamedInput } from '../addClangTidyNamedInput/addClangTidyNamedInput';
import { addCmakeNamedInput } from '../addCmakeNamedInput/addCmakeNamedInput';

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
    updatedNxJson = writeConfig(nxJson, updatedNxJson, options);
    updatedNxJson = writeGeneratorConfig(nxJson, updatedNxJson, options);
    updatedNxJson = formatNxJson(nxJson, updatedNxJson);
    return [updatedNxJson, options];
};
