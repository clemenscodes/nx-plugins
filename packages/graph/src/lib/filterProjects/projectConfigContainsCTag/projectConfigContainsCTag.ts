import type { ProjectConfiguration } from '@nx/devkit';
import { isC } from '../isC/isC';

export const projectConfigContainsCTag = (
    config: ProjectConfiguration,
): boolean => {
    const { tags } = config;
    if (!tags) {
        return false;
    }
    return tags.some(isC);
};
