import { execSync } from 'node:child_process';

export const publishPackages = () => {
    execSync('nx run-many --targets publish --ver 1.0.0 --tag e2e', {
        env: {
            ...process.env,
            NX_CLOUD_DISTRIBUTED_EXECUTION: 'false',
        },
        stdio: 'inherit',
    });
};
