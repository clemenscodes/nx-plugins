import {
    REQUIRED_MAJOR_NX_VERSION,
    REQUIRED_MINOR_NX_VERSION,
    REQUIRED_PATCH_NX_VERSION,
} from '@/config';

export const getRequiredVersionOfNx = (): string => {
    const requiredVersionOfNx = [
        REQUIRED_MAJOR_NX_VERSION,
        REQUIRED_MINOR_NX_VERSION,
        REQUIRED_PATCH_NX_VERSION,
    ]
        .map(String)
        .join('.');
    return requiredVersionOfNx;
};
