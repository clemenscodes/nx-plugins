import {
    REQUIRED_MAJOR_NX_VERSION,
    REQUIRED_MINOR_NX_VERSION,
} from '../../../../config/version';

export const checkNxVersion = (version: string): boolean => {
    const [major, minor] = version.split('.').map((chunk) => parseInt(chunk));

    if (major < REQUIRED_MAJOR_NX_VERSION) {
        return false;
    }
    if (major > REQUIRED_MAJOR_NX_VERSION) {
        return true;
    }
    if (minor >= REQUIRED_MINOR_NX_VERSION) {
        return true;
    }
    if (minor < REQUIRED_MINOR_NX_VERSION) {
        return false;
    }
};