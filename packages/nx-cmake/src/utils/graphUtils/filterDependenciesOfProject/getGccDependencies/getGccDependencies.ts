import { executeCommand } from '../../../commandUtils/executeCommand/executeCommand';
import { detectTestFramework } from '../detectTestFramework/detectTestFramework';
import { installTestFramework } from '../installTestFramework/installTestFramework';
import { logger } from '../../../pluginUtils/logger/logger';

export const getGccDependencies = (
    cmd: string,
    projectRoot: string,
    workspaceRoot: string,
): string => {
    try {
        return executeCommand(cmd);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }
        const { message } = error;

        if (detectTestFramework(message)) {
            return installTestFramework(workspaceRoot, projectRoot, cmd);
        }
        logger(JSON.stringify(error));
        throw error;
    }
};
