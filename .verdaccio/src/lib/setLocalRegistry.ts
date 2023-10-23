import { execSync } from 'child_process';
import { port } from './port';
import { registry } from './registry';

export const setLocalRegistry = () => {
    process.env.npm_config_registry = registry;
    const cmd = `npm config set //localhost:${port}/:_authToken "secretVerdaccioToken"`;
    execSync(cmd);
    console.log('Set npm config registry to ' + registry);
};
