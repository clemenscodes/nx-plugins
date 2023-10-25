import { execSync } from 'node:child_process';

export const publishPackages = () => {
    execSync('pnpm nx affected --targets publish', {
        env: {
            ...process.env,
        },
        stdio: 'inherit',
    });
};
