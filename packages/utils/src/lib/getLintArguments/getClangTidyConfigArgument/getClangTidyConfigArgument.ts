import { CLANG_TIDY_CONFIG_FILE } from '@/config';
import { getConfigFile } from '@/file';

export const getClangTidyConfigArgument = (
    workspaceRoot: string,
    projectRoot: string,
): string => {
    const configFile = getConfigFile(
        workspaceRoot,
        projectRoot,
        CLANG_TIDY_CONFIG_FILE,
    );
    const configArgument = `--config-file=${configFile}`;
    return configArgument;
};
