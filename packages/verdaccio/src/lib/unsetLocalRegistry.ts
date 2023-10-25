import { execSync } from 'child_process';
import { port } from '../config/port';
import { hostname } from '../config/hostname';

export const unsetLocalRegistry = () => {
    execSync(`npm config delete //${hostname}:${port}/:_authToken`);
};
