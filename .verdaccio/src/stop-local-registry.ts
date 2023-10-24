import { execSync } from 'node:child_process';
import { port } from './lib/port';
import { unsetLocalRegistry } from './lib/unsetLocalRegistry';
import { exit } from 'node:process';

const stopLocalRegistry = () => {
    execSync(`npx kill-port ${port}`);
};

function main() {
    if (process.env.SKIP) {
        console.log('Skipping stop');
        exit(0);
    }
    stopLocalRegistry();
    unsetLocalRegistry();
    exit(0);
}

main();