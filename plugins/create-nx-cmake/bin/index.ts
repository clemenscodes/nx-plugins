#!/usr/bin/env node

import { createWorkspace } from 'create-nx-workspace';

async function main() {
    const name = process.argv[2];

    if (!name) {
        throw new Error('Please provide a name for the workspace');
    }

    console.log(`Creating the workspace: ${name}`);

    const { directory } = await createWorkspace(`nx-cmake`, {
        name,
        nxCloud: 'skip',
        defaultBase: 'main',
        interactive: false,
        packageManager: 'npm',
    });

    console.log(`Successfully created the workspace: ${directory}.`);
}

main();
