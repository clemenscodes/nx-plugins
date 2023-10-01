import { isDarwin } from '../isDarwin/isDarwin';

export const getCompiler = () => {
    return isDarwin(process.platform) ? '/usr/local/bin/gcc-13' : 'gcc';
};
