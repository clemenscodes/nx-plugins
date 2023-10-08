import { output } from '@nx/devkit';

export const logger = (title: string, ...messages: string[]) => {
    if (process.env['NX_VERBOSE_LOGGING'] === 'true') {
        output.log({ title, bodyLines: messages });
    }
};
