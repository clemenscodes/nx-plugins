import { execSync } from 'node:child_process';

export const publishPackages = () => {
    execSync('pnpm nx run-many --targets publish --ver 1.0.0 --tag e2e', {
        env: {
            ...process.env,
        },
        stdio: 'inherit',
    });
};
