import { fork } from 'node:child_process';
import { localRegistryTarget } from './lib/localRegistryTarget';
import { port } from './lib/port';
import { setLocalRegistry } from './lib/setLocalRegistry';
import { publishPackages } from './lib/publishPackages';
import { project } from './lib/project';
import { exit } from 'process';

const startLocalRegistry = () => {
    if (process.env.SKIP) {
        console.log('Skipping start');
        exit(0);
    }
    fork(require.resolve('nx'), [localRegistryTarget, project], {
        stdio: 'inherit',
        detached: true,
        env: {
            ...process.env,
        },
    }).unref();
    console.log('Local registry started on port ' + port);
};

(async () => {
    startLocalRegistry();
    setLocalRegistry();
    await publishPackages();
    exit(0);
})();
