import * as net from 'net';

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const checkPortOccupied = async (
    maxRetries: number,
    delayMs: number,
    port: number,
): Promise<boolean> => {
    let retries = 0;
    let started = false;
    while (retries < maxRetries) {
        if (started) {
            return true;
        }
        try {
            const server = net.createServer().listen(port);
            server.on('error', (e) => {
                if ('code' in e && e.code === 'EADDRINUSE') {
                    server.close();
                    started = true;
                }
            });
            server.close();
            throw new Error('Verdaccio not started yet');
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `Attempt ${retries + 1} failed: ${error.message}`,
                );
                await sleep(delayMs);
                retries++;
            }
        }
    }
    return false;
};
