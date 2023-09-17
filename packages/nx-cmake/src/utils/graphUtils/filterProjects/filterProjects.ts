import type { ProjectGraph } from '@nx/devkit';
import type { CTag, FilteredProject } from '../../../models/types';
import { getProjectTypeFromConfig } from '../../generatorUtils/getProjectTypeFromConfig/getProjectTypeFromConfig';

export const isC = (s: string) => s === 'c' || s === 'cpp';
export const filterTags = (tags: string[]) => tags.filter(isC);
export const getTag = (tags: string[]) => tags.find(isC) as CTag;

export const filterProjects = (
    nodes: ProjectGraph['nodes']
): FilteredProject[] => {
    const filteredProjects = Object.values(nodes)
        .filter((node) => {
            const { data } = node;
            if (data.tags === undefined) {
                return false;
            }
            return data.tags.some(isC);
        })
        .map((node) => {
            const { data } = node;
            const { name, root, tags, sourceRoot } = data;
            const tag = getTag(tags);
            const type = getProjectTypeFromConfig(data);
            return { name, root, type, tag, sourceRoot };
        });
    return filteredProjects;
};
