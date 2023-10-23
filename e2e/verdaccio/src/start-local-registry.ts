import { spawn } from 'child_process';
import { localRegistryTarget } from './lib/localRegistryTarget';
import { port } from './lib/port';
import { setLocalRegistry } from './lib/setLocalRegistry';
import { publishPackages } from './lib/publishPackages';
import { project } from './lib/project';
import { exit } from 'process';

const startLocalRegistry = () => {
    spawn('nx', [localRegistryTarget, project], {
        stdio: 'pipe',
        detached: true,
        env: {
            ...process.env,
            NX_CLOUD_DISTRIBUTED_EXECUTION: 'false',
        },
    }).unref();
    console.log('Local registry started on port ' + port);
};

function main() {
    startLocalRegistry();
    setLocalRegistry();
    publishPackages();
    exit(0);
}

main();
