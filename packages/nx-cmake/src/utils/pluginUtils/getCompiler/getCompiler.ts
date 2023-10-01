import { isDarwin } from '../isDarwin/isDarwin';

export const getCompiler = () => {
    return isDarwin(process.platform) ? 'gcc-13' : 'gcc';
};
