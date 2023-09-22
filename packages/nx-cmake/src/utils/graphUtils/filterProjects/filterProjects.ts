import type { ProjectGraph } from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { getProjectTypeFromConfig } from '../../generatorUtils/getProjectTypeFromConfig/getProjectTypeFromConfig';
import { getTag } from './getTag/getTag';
import { isC } from './isC/isC';

export const filterProjects = (
    nodes: ProjectGraph['nodes'],
): FilteredProject[] => {
    const filteredProjects = Object.values(nodes)
        .filter(({ data }) => {
            const { tags } = data;
            return tags.some(isC);
        })
        .map(({ data }) => {
            const { name, root, tags, sourceRoot } = data;
            const tag = getTag(tags);
            const type = getProjectTypeFromConfig(data);
            return { name, root, type, tag, sourceRoot };
        });
    return filteredProjects;
};
