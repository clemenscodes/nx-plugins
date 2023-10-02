import { isDarwin } from '../../../../utils/pluginUtils/isDarwin/isDarwin';
import { isWindows } from '../../../../utils/pluginUtils/isWindows/isWindows';
import {
    DARWIN_CMAKE,
    WINDOWS_CMAKE,
    LINUX_CMAKE,
} from '../../../../config/compiler';

export const getCmake = (): string => {
    if (isDarwin(process.platform)) {
        return DARWIN_CMAKE;
    }
    if (isWindows(process.platform)) {
        return WINDOWS_CMAKE;
    }
    return LINUX_CMAKE;
};
