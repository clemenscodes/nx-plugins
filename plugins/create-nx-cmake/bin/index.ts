#!/usr/bin/env node

import { createWorkspace } from 'create-nx-workspace';

async function main() {
    const name = process.argv[2]; // TODO: use libraries like yargs or enquirer to set your workspace name
    if (!name) {
        throw new Error('Please provide a name for the workspace');
    }

    console.log(`Creating the workspace: ${name}`);

    // This assumes "nx-cmake" and "create-nx-cmake" are at the same version
    const { version } = await import('../package.json');

    // TODO: update below to customize the workspace
    const { directory } = await createWorkspace(`nx-cmake@${version}`, {
        name,
        nxCloud: false,
        packageManager: 'npm',
    });

    console.log(`Successfully created the workspace: ${directory}.`);
}

main();
