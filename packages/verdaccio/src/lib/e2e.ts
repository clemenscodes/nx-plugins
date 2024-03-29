import { execSync } from 'node:child_process';
import { exit } from 'node:process';
import { startLocalRegistry } from './startLocalRegistry';
import { stopLocalRegistry } from './stopLocalRegistry';

process.env['npm_config_registry'] = 'http://localhost:4873';

export const e2e = (procedure: 'affected' | 'run-many') => {
    const registryProcess = startLocalRegistry();
    const parallel = process.env['NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT']
        ? `--parallel=${process.env['NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT']}`
        : '';
    const head = process.env['NX_HEAD']
        ? `--head=${process.env['NX_HEAD']}`
        : '';
    const base = process.env['NX_BASE']
        ? `--base=${process.env['NX_BASE']}`
        : '';
    const cmd = `nx ${procedure} -t e2e --nx-bail --output-style=stream --configuration=ci ${base} ${head} ${parallel}`;
    try {
        execSync(cmd, {
            stdio: 'inherit',
            env: {
                ...process.env,
                SKIP: 'true',
            },
        });
    } catch (e) {
        stopLocalRegistry(registryProcess);
        exit(1);
    }
    stopLocalRegistry(registryProcess);
    exit(0);
};
