import { ChildProcess, execSync } from 'child_process';
import { unsetLocalRegistry } from './unsetLocalRegistry';

export const stopLocalRegistry = (childProcess: ChildProcess | null) => {
    if (process.env['SKIP']) {
        console.log('Skipping stop');
        return;
    }
    unsetLocalRegistry();
    if (childProcess) {
        childProcess.kill();
        return;
    }
    execSync(`npx kill-port 4873`, {
        env: {
            ...process.env,
            npm_config_registry: 'https://registry.npmjs.org',
        },
        stdio: 'inherit',
        encoding: 'utf-8',
    });
};
