import { execSync } from 'node:child_process';
import { startLocalRegistry } from './startLocalRegistry';
import { stopLocalRegistry } from './stopLocalRegistry';
import { exit } from 'node:process';

export const e2e = (procedure: 'affected' | 'run-many') => {
    const registryProcess = startLocalRegistry();
    execSync(
        `nx ${procedure} -t e2e --output-style=stream --configuration=ci`,
        {
            stdio: 'inherit',
            env: {
                ...process.env,
                SKIP: 'true',
            },
        },
    );
    stopLocalRegistry(registryProcess);
    exit(0);
};
