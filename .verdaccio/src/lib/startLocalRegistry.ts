import { ChildProcess, spawn } from 'child_process';
import { localRegistryTarget } from './localRegistryTarget';
import { port } from './port';
import { project } from './project';
import { setLocalRegistry } from './setLocalRegistry';

export const startLocalRegistry = (): ChildProcess | null => {
    if (process.env.SKIP) {
        console.log('Skipping start');
        return null;
    }
    const childProcess = spawn('nx', [localRegistryTarget, project], {
        stdio: 'inherit',
        detached: true,
        env: {
            ...process.env,
        },
    });
    childProcess.unref();
    console.log('Local registry started on port ' + port);
    setLocalRegistry();
    return childProcess;
};
