import { isDarwin } from '../../../../utils/pluginUtils/isDarwin/isDarwin';
import { isWindows } from '../../../../utils/pluginUtils/isWindows/isWindows';
import { fileExists } from '../../../../utils/fileUtils/fileExists/fileExists';
import {
    DARWIN_CMAKE,
    WINDOWS_CMAKE,
    LINUX_CMAKE,
} from '../../../../config/programs';

export const getCmake = (): string => {
    if (isDarwin(process.platform)) {
        if (fileExists(DARWIN_CMAKE)) {
            return DARWIN_CMAKE;
        }
        throw new Error(`cmake was not found at expected path ${DARWIN_CMAKE}`);
    }
    if (isWindows(process.platform)) {
        if (fileExists(WINDOWS_CMAKE)) {
            return WINDOWS_CMAKE;
        }
        throw new Error(
            `cmake was not found at expected path ${WINDOWS_CMAKE}`,
        );
    }

    if (fileExists(LINUX_CMAKE)) {
        return LINUX_CMAKE;
    }
    throw new Error(`cmake was not found at expected path ${LINUX_CMAKE}`);
};