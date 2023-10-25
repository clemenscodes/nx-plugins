import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { mockFormatFiles } from '../mockFormatFiles/mockFormatFiles';

export const setupWorkspace = (): Tree => {
    mockFormatFiles();
    const tree = createTreeWithEmptyWorkspace();
    return tree;
};
