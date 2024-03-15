import { execSync } from 'child_process';

export const setLocalRegistry = () => {
    process.env['npm_config_registry'] = 'http://localhost:4873';
    const cmd = `npm config set //localhost:4873/:_authToken "secretVerdaccioToken"`;
    execSync(cmd);
    console.log('Set npm config registry to ' + 'http://localhost:4873');
};
