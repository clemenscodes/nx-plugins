import { exit } from 'node:process';
import { stopLocalRegistry } from '../lib/stopLocalRegistry';

stopLocalRegistry(null);
if (!process.env['SKIP']) {
    exit(0);
}
