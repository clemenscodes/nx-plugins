import { InitGeneratorSchema } from '../../generator';

export const getDefaultInitGeneratorOptions = () => {
    const options: InitGeneratorSchema = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        globalIncludeDir: 'include',
        appsDir: 'bin',
        libsDir: 'libs',
        addClangPreset: true,
        skipFormat: false,
        workspaceName: 'workspace',
    };
    return options;
};
