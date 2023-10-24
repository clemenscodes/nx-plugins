import { execSync } from 'child_process';
import { port } from './port';
import { hostname } from './hostname';

export const unsetLocalRegistry = () => {
    execSync(`npm config delete //${hostname}:${port}/:_authToken`);
};
