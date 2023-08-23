import type { ProjectGraph } from '@nx/devkit';
import type { CTag, FilteredProject } from '../models/types';

export const isC = (s: string) => s === 'c' || s === 'cpp';
export const filterTags = (tags: string[]) => tags.filter(isC);
export const getTag = (tags: string[]) => tags.find(isC) as CTag;

export const filterProjects = (
    nodes: ProjectGraph['nodes']
): FilteredProject[] => {
    const filteredProjects = Object.values(nodes)
        .filter(({ data }) => data.tags.some(isC))
        .map(({ data, type }) => {
            const { name, root, tags } = data;
            const tag = getTag(tags);
            return { name, root, type, tag };
        });
    return filteredProjects;
};
