import { isWindows } from '../../pluginUtils/isWindows/isWindows';

export const normalizeLineEndings = (input: string): string => {
    return isWindows(process.platform) ? input.replace(/\r/g, '') : input;
};
