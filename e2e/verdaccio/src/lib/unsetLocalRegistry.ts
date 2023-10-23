import { execSync } from 'child_process';
import { port } from './port';

export const unsetLocalRegistry = () => {
    execSync(`npm config delete //localhost:${port}/:_authToken`);
};
