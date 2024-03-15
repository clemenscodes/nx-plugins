import { execSync } from 'child_process';

export const unsetLocalRegistry = () => {
    execSync(`npm config delete //localhost:4873/:_authToken`);
};
