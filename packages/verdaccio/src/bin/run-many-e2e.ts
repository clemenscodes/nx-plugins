import { e2e } from '../lib/e2e';

process.env['npm_config_registry'] = 'http://localhost:4873';

e2e('run-many');
