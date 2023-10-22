import type { ProjectConfiguration } from '@nx/devkit';
import { FilteredProject } from '@/types';
import { getProjectTypeFromConfig } from '@/utils';
import { getTag } from '../getTag/getTag';

export const createFilteredProject = (
    config: ProjectConfiguration,
): FilteredProject => {
    const { name, root, tags, sourceRoot } = config;
    if (!name) {
        throw new Error(`Could not get name from project configuration`);
    }
    if (!sourceRoot) {
        throw new Error(`Could not get sourceRoot from project configuration`);
    }
    const tag = getTag(tags);
    const type = getProjectTypeFromConfig(config);
    return { name, root, type, tag, sourceRoot };
};
