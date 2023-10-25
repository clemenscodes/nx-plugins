import type { CreateNodes } from '@nx/devkit';
import { createNodesFunction } from '../createNodesFunction/createNodesFunction';
import { PROJECT_FILE_PATTERN } from '../../config';

export const createNodes: CreateNodes = [
    PROJECT_FILE_PATTERN,
    createNodesFunction,
];
