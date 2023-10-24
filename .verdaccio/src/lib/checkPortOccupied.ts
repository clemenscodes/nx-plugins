import { hostname } from './hostname';
import * as net from 'net';

export const checkPortOccupied = (
    maxRetries: number,
    delayMs: number,
    port: number,
): boolean => {
    let retries = 0;
    let started = false;
    while (retries < maxRetries) {
        if (started) {
            return true;
        }
        try {
            const server = net.createServer().listen(port, hostname);
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
                setTimeout(() => {}, delayMs);
                retries++;
            }
        }
    }
    return false;
};
