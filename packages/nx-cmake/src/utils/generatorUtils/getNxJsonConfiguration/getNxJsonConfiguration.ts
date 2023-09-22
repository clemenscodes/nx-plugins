import type { NxJsonConfiguration } from '@nx/devkit';
import { readJsonFile, workspaceRoot } from '@nx/devkit';

export const getNxJsonConfiguration = (): NxJsonConfiguration => {
    const nxJsonFile = `${workspaceRoot}/nx.json`;
    const nxJson: NxJsonConfiguration = readJsonFile(nxJsonFile);
    return nxJson;
};
