import { execSync } from 'child_process';
import { port } from '../config/port';
import { registry } from '../config/registry';
import { hostname } from '../config/hostname';

export const setLocalRegistry = () => {
    process.env['npm_config_registry'] = registry;
    const cmd = `npm config set //${hostname}:${port}/:_authToken "secretVerdaccioToken"`;
    execSync(cmd);
    console.log('Set npm config registry to ' + registry);
};
