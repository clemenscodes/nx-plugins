import { InitGeneratorSchema, InitSchema } from '../../generator';
import { resolveInitOptions } from '../resolveInitOptions/resolveInitOptions';

export const getDefaultInitGeneratorOptions = (): InitSchema => {
    const options: InitGeneratorSchema = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        appsDir: 'bin',
        libsDir: 'libs',
        addClangPreset: true,
        skipFormat: false,
        workspaceName: 'workspace',
    };
    const resolvedOptions = resolveInitOptions(options);
    return resolvedOptions;
};
