import { isDarwin } from '../isDarwin/isDarwin';
import { isWindows } from '../isWindows/isWindows';
import { DARWIN_GCC, WINDOWS_GCC, LINUX_GCC } from '../../../config/programs';

export const getCompiler = () => {
    if (isDarwin(process.platform)) {
        return DARWIN_GCC;
    }
    if (isWindows(process.platform)) {
        return WINDOWS_GCC;
    }
    return LINUX_GCC;
};
