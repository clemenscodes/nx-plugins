/**
 * This script starts a local registry for e2e testing purposes.
 * It is meant to be called in jest's globalSetup.
 */

import { execSync, fork } from 'child_process';

/**
 * This function is used to start a local registry for testing purposes.
 * @param localRegistryTarget the target to run to start the local registry e.g. workspace:local-registry
 * @param storage the storage location for the local registry
 * @param verbose whether to log verbose output
 */
export function startLocalRegistry({
    localRegistryTarget,
    storage,
    verbose,
}: {
    localRegistryTarget: string;
    storage?: string;
    verbose?: boolean;
}) {
    if (!localRegistryTarget) {
        throw new Error(`localRegistryTarget is required`);
    }
    return new Promise<() => void>((resolve, reject) => {
        const childProcess = fork(
            require.resolve('nx'),
            [
                ...`run ${localRegistryTarget} --location none --clear true`.split(
                    ' ',
                ),
                ...(storage ? [`--storage`, storage] : []),
            ],
            {
                stdio: 'pipe',
                env: {
                    ...process.env,
                    NX_CLOUD_DISTRIBUTED_EXECUTION: 'false',
                },
            },
        );

        const listener = (data) => {
            if (verbose) {
                process.stdout.write(data);
            }
            if (data.toString().includes('http://localhost:')) {
                const port = parseInt(
                    data.toString().match(/localhost:(?<port>\d+)/)?.groups
                        ?.port,
                );
                console.log('Local registry started on port ' + port);

                const registry = `http://localhost:${port}`;
                process.env.npm_config_registry = registry;
                execSync(
                    `npm config set //localhost:${port}/:_authToken "secretVerdaccioToken"`,
                );
                console.log('Set npm config registry to ' + registry);
                resolve(() => {
                    childProcess.kill();
                    execSync(
                        `npm config delete //localhost:${port}/:_authToken`,
                    );
                });
                childProcess?.stdout?.off('data', listener);
            }
        };
        childProcess?.stdout?.on('data', listener);
        childProcess?.stderr?.on('data', (data) => {
            process.stderr.write(data);
        });
        childProcess.on('error', (err) => {
            console.log('local registry error', err);
            reject(err);
        });
        childProcess.on('exit', (code) => {
            console.log('local registry exit', code);
            if (code !== 0) {
                reject(code);
            } else {
                resolve(() => {});
            }
        });
    });
}

export default async () => {
    // local registry target to run
    const localRegistryTarget = 'verdaccio:local-registry';
    // storage folder for the local registry
    const storage = './tmp/local-registry/storage';

    global.stopLocalRegistry = await startLocalRegistry({
        localRegistryTarget,
        storage,
        verbose: false,
    });
    execSync('pnpm nx run-many --targets publish --ver 1.0.0 --tag e2e', {
        env: {
            ...process.env,
            NX_CLOUD_DISTRIBUTED_EXECUTION: 'false',
        },
        stdio: 'inherit',
    });
};
