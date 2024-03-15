import { execSync } from 'node:child_process';
import { exit } from 'node:process';
import { startLocalRegistry } from './startLocalRegistry';
import { stopLocalRegistry } from './stopLocalRegistry';

export const e2eSingle = (target: string) => {
    const registryProcess = startLocalRegistry();
    const head = process.env['NX_HEAD']
        ? `--head=${process.env['NX_HEAD']}`
        : '';
    const base = process.env['NX_BASE']
        ? `--base=${process.env['NX_BASE']}`
        : '';
    const cmd = `nx run-e2e ${target} --nx-bail --output-style=stream --configuration=ci ${base} ${head}`;
    execSync(cmd, {
        stdio: 'inherit',
        env: {
            ...process.env,
            SKIP: 'true',
        },
    });
    stopLocalRegistry(registryProcess);
    exit(0);
};
