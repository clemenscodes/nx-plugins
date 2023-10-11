import type { ProjectConfiguration } from '@nx/devkit';
import { isC } from '../isC/isC';

export const projectConfigContainsCTag = (config: ProjectConfiguration) => {
    const { tags } = config;
    if (!tags) {
        throw new Error(`project configuration does not contain tags`);
    }
    return tags.some(isC);
};
