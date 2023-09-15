import { commandExists } from '../commandExists/commandExists';

export const checkCommandExists = (command: string): string => {
    const checkedCommandExists = commandExists(command);

    if (!checkedCommandExists) {
        throw new Error(
            `${checkedCommandExists} is not installed but required for this executor to run`
        );
    }

    return command;
};
