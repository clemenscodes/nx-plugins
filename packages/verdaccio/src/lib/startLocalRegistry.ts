import { ChildProcess, spawn } from 'child_process';
import { setLocalRegistry } from './setLocalRegistry';

export const startLocalRegistry = (): ChildProcess | null => {
    if (process.env['SKIP']) {
        console.log('Skipping start');
        return null;
    }
    setLocalRegistry();
    const childProcess = spawn('nx', ['local-registry', 'verdaccio'], {
        stdio: 'pipe',
        detached: true,
        env: {
            ...process.env,
            npm_config_registry: 'http://localhost:4873',
        },
    });
    return childProcess;
};
