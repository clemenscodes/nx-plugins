import { execSync } from 'node:child_process';
import { project } from './project';
import { registry } from './registry';

export const publishPackages = () => {
    execSync(`nx run-many -t publish --exclude ${project}`, {
        stdio: 'inherit',
        encoding: 'utf-8',
        env: {
            ...process.env,
            npm_config_registry: registry,
        },
    });
};
