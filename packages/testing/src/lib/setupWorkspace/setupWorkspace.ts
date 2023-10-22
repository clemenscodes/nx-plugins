import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { getDefaultInitGeneratorOptions } from '@/config';
import { initGenerator } from '@/utils';
import { mockFormatFiles } from '@/mocks';

export const setupWorkspace = async (): Promise<Tree> => {
    mockFormatFiles();
    const tree = createTreeWithEmptyWorkspace();
    await initGenerator(tree, getDefaultInitGeneratorOptions());
    return tree;
};
