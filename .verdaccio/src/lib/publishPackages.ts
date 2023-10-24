import { execSync } from 'node:child_process';
import { project } from './project';

export const publishPackages = () => {
    execSync(`nx run-many -t publish --exclude ${project}`, {
        stdio: 'inherit',
        encoding: 'utf-8',
        env: {
            ...process.env,
        },
    });
};
