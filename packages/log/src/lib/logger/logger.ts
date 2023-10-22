import { output } from '@nx/devkit';
import { isVerbose } from '../isVerbose/isVerbose';

export const logger = (title: string, ...messages: string[]) => {
    if (isVerbose()) {
        output.log({ title, bodyLines: messages });
    }
};
