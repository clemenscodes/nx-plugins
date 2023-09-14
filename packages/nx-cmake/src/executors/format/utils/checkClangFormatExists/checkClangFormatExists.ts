import { commandExists } from '../../../../utils/commandUtils/commandExists/commandExists';

export const checkClangFormatExists = () => {
    const formatCommand = 'clang-format';

    const formatCommandExists = commandExists(formatCommand);

    if (!formatCommandExists) {
        throw new Error(
            `${formatCommand} is not installed but required for this executor to run`
        );
    }

    return formatCommand;
};
