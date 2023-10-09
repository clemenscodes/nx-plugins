import type { CreateNodes } from '@nx/devkit';
import { PROJECT_FILE_PATTERN } from '@/config';
import { createNodesFunction } from '../createNodesFunction/createNodesFunction';

export const createNodes: CreateNodes = [
    PROJECT_FILE_PATTERN,
    createNodesFunction,
];
