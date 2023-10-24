import { execSync } from 'node:child_process';
import { project } from './project';
import { registry } from './registry';
import { checkPortOccupied } from './checkPortOccupied';
import { port } from './port';

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const retryOperation = async (
    maxRetries: number,
    delayMs: number,
    callback: (port: number) => Promise<boolean>,
): Promise<void> => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            callback(port);
            break;
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `Attempt ${retries + 1} failed: ${error.message}`,
                );
                await sleep(delayMs);
                retries++;
            }
            throw error;
        }
    }
};

export const publishPackages = async () => {
    const maxRetries = 30;
    const delayMs = 1000;
    try {
        await retryOperation(maxRetries, delayMs, checkPortOccupied);
        const isOccupied = await checkPortOccupied(port);
        if (isOccupied) {
            execSync(`nx run-many -t publish --exclude ${project}`, {
                stdio: 'inherit',
                encoding: 'utf-8',
                env: {
                    ...process.env,
                    npm_config_registry: registry,
                },
            });
        } else {
            throw new Error('Verdaccio Server failed to start');
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(
                `Error occurred while checking the port: ${e.message}`,
            );
        }
        throw e;
    }
};
