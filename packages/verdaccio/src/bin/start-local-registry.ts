import { startLocalRegistry } from '../lib/startLocalRegistry';

const registryProcess = startLocalRegistry();
if (registryProcess) {
    console.log('Local registry started on port 4873');
    registryProcess.unref();
}
