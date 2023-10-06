import { logger } from '@/utils';
import { executeCommand } from '@/command';
import { detectTestFramework } from '../detectTestFramework/detectTestFramework';
import { installTestFramework } from '../installTestFramework/installTestFramework';

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
