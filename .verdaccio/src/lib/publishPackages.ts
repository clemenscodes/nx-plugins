import { execSync } from 'node:child_process';
import { project } from './project';
import { registry } from './registry';
import { checkPortOccupied } from './checkPortOccupied';
import { port } from './port';

export const publishPackages = async () => {
    try {
        const isOccupied = await checkPortOccupied(30, 1000, port);
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
