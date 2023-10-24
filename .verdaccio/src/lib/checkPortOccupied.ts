import { port } from './port';
import * as net from 'net';

export const checkPortOccupied = (port: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const tester = net
            .createServer()
            .once('error', (err: any) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                } else {
                    reject(err);
                }
            })
            .once('listening', () => {
                tester
                    .once('close', () => {
                        resolve(false);
                    })
                    .close();
            })
            .listen(port);
    });
};
