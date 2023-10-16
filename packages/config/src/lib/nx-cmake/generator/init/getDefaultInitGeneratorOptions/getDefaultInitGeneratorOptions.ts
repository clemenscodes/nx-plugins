import { InitGeneratorSchema } from '../../generator';

export const getDefaultInitGeneratorOptions = () => {
    const options: InitGeneratorSchema = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        globalIncludeDir: 'include',
        appsDir: 'bin',
        libsDir: 'packages',
        addClangPreset: true,
        skipFormat: false,
    };
    return options;
};
