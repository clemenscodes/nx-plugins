import { e2eSingle } from '../lib/single-e2e';
const [, , target] = process.argv;

process.env['npm_config_registry'] = 'http://localhost:4873';

e2eSingle(target);
