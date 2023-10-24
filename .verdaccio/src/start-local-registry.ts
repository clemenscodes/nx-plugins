import { spawn } from 'node:child_process';
import { localRegistryTarget } from './lib/localRegistryTarget';
import { port } from './lib/port';
import { setLocalRegistry } from './lib/setLocalRegistry';
import { publishPackages } from './lib/publishPackages';
import { project } from './lib/project';
import { exit } from 'process';
import { registry } from './lib/registry';

const startLocalRegistry = () => {
    spawn('nx', [localRegistryTarget, project], {
        stdio: 'inherit',
        detached: true,
        env: {
            ...process.env,
            npm_config_registry: registry,
        },
    }).unref();
    console.log('Local registry started on port ' + port);
};

function main() {
    if (process.env.SKIP) {
        console.log('Skipping start');
        exit(0);
    }
    (async () => {
        startLocalRegistry();
        setLocalRegistry();
        await publishPackages();
        exit(0);
    })();
}

main();
