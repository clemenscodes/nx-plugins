import { commandExists } from '../commandExists/commandExists';

export const checkCommandExists = (command: string) => {
    const checkedCommandExists = commandExists(command);

    if (!checkedCommandExists) {
        throw new Error(
            `${command} is not installed but required for this executor to run.`,
        );
    }
};
